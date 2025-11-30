-- Helper function to increment subscriber count
CREATE OR REPLACE FUNCTION increment_subscriber_count(provider_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET total_subscribers = total_subscribers + 1
  WHERE id = provider_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to decrement subscriber count
CREATE OR REPLACE FUNCTION decrement_subscriber_count(provider_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET total_subscribers = GREATEST(0, total_subscribers - 1)
  WHERE id = provider_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update subscriber count on subscription changes
CREATE OR REPLACE FUNCTION handle_subscription_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'active' THEN
    PERFORM increment_subscriber_count(NEW.provider_id);
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'active' AND NEW.status = 'active' THEN
      PERFORM increment_subscriber_count(NEW.provider_id);
    ELSIF OLD.status = 'active' AND NEW.status != 'active' THEN
      PERFORM decrement_subscriber_count(NEW.provider_id);
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'active' THEN
    PERFORM decrement_subscriber_count(OLD.provider_id);
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_subscription_change ON subscriptions;
CREATE TRIGGER on_subscription_change
  AFTER INSERT OR UPDATE OR DELETE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION handle_subscription_change();

-- Enable realtime for signals table
ALTER PUBLICATION supabase_realtime ADD TABLE signals;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
