-- Add date_of_birth column
ALTER TABLE user_profiles ADD COLUMN date_of_birth date;

-- Copy data from age to date_of_birth (approximate)
UPDATE user_profiles 
SET date_of_birth = (CURRENT_DATE - (age || ' years')::interval)::date;

-- Make date_of_birth not null
ALTER TABLE user_profiles ALTER COLUMN date_of_birth SET NOT NULL;

-- Drop the age column
ALTER TABLE user_profiles DROP COLUMN age; 