# Nibbl - Weight Tracking Application

A modern web application for tracking weight and body composition statistics, built with Nuxt 4, TypeScript, Vuetify, and Supabase.

## Features

- Track weight and body composition metrics
- View historical data in a table format
- Visualize trends with interactive charts
- Responsive design for all devices
- Google authentication
- Real-time data updates

## Prerequisites

- Node.js 18 or later
- pnpm package manager
- Supabase account

## Installation

```bash
# clone the repository
git clone https://github.com/yourusername/nibbl.git

# navigate to the project directory
cd nibbl
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a Supabase project and set up the following environment variables in a `.env` file:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

4. Create the following tables in your Supabase database:
```sql
create table user_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null unique,
  height decimal not null,
  age integer not null,
  gender text not null check (gender in ('male', 'female', 'other')),
  goal_weight decimal not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table weight_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  date string not null,
  weight decimal not null,
  fat_percentage decimal,
  visceral_level decimal,
  muscle_mass decimal,
  physique_level decimal,
  bone_mass decimal,
  kcal_intake integer,
  metabolic_age integer,
  body_water_percentage decimal,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table user_profiles enable row level security;
alter table weight_entries enable row level security;

-- Create policies to allow users to only see their own data
create policy "Users can only access their own profile"
  on user_profiles for all
  using (auth.uid() = user_id);

create policy "Users can only access their own entries"
  on weight_entries for all
  using (auth.uid() = user_id);
```

5. Run the development server:
```bash
pnpm dev
```

## Deployment

The application can be deployed to Vercel:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
