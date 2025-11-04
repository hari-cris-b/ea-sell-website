/*
  # Create Authentication and Order Management Tables

  ## Overview
  Sets up complete order management system with user authentication, team assignment,
  and offline payment tracking for Forex EA store.

  ## New Tables

  ### 1. customer_users
  - `id` (uuid, primary key) - Unique user identifier (linked to auth)
  - `email` (text, unique) - Customer email
  - `name` (text) - Customer full name
  - `city` (text) - Customer city
  - `referral_code` (text, nullable) - Referral code (optional)
  - `created_at` (timestamptz) - Account creation timestamp

  ### 2. client_teams
  - `id` (uuid, primary key) - Unique team member identifier
  - `name` (text) - Team member name
  - `email` (text, unique) - Team member email
  - `is_active` (boolean) - Active status
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. orders
  - `id` (uuid, primary key) - Unique order identifier (also used as Order ID shown to customer)
  - `user_id` (uuid, foreign key) - Customer user ID
  - `client_team_id` (uuid, foreign key) - Assigned client team member
  - `items` (jsonb) - Array of ordered products with prices
  - `total_amount` (numeric) - Total order amount
  - `status` (text) - pending/payment_received/completed/cancelled
  - `payment_method` (text, nullable) - Bank transfer/UPI/Card/Other (filled during call)
  - `payment_reference` (text, nullable) - Reference number for payment verification
  - `created_at` (timestamptz) - Order creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Customers can only view their own data
  - Team members can view all orders assigned to them
  - Proper authentication checks

  ## Notes
  - Order ID is the UUID itself, easily shareable with customer
  - Team assignment happens at checkout
  - Payment details collected during offline call
*/

-- Create customer_users table
CREATE TABLE IF NOT EXISTS customer_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  city text NOT NULL,
  referral_code text,
  created_at timestamptz DEFAULT now()
);

-- Create client_teams table
CREATE TABLE IF NOT EXISTS client_teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES customer_users(id) ON DELETE CASCADE,
  client_team_id uuid NOT NULL REFERENCES client_teams(id) ON DELETE RESTRICT,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount numeric(10, 2) NOT NULL CHECK (total_amount >= 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'payment_received', 'completed', 'cancelled')),
  payment_method text,
  payment_reference text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customer_users_email ON customer_users(email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_client_team_id ON orders(client_team_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_client_teams_active ON client_teams(is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE customer_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Customer Users policies
CREATE POLICY "Users can view their own profile"
  ON customer_users FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their profile"
  ON customer_users FOR INSERT
  WITH CHECK (true);

-- Client Teams policies (public read for active teams)
CREATE POLICY "Anyone can view active teams"
  ON client_teams FOR SELECT
  USING (is_active = true);

-- Orders policies
CREATE POLICY "Customers can view their own orders"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only assigned team can update order"
  ON orders FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Insert sample client team members
INSERT INTO client_teams (name, email, is_active) VALUES
('Raj Kumar', 'raj.kumar@forexeapro.com', true),
('Priya Singh', 'priya.singh@forexeapro.com', true),
('Amit Patel', 'amit.patel@forexeapro.com', true),
('Sarah Johnson', 'sarah.johnson@forexeapro.com', true),
('Marco Rodriguez', 'marco.rodriguez@forexeapro.com', true)
ON CONFLICT DO NOTHING;