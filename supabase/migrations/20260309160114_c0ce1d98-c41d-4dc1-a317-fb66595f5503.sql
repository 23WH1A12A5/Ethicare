
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  date_of_birth DATE NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  state TEXT NOT NULL,
  address TEXT,
  gender TEXT,
  profile_image_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  email_verified BOOLEAN NOT NULL DEFAULT false,
  phone_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create user_images table
CREATE TABLE public.user_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Unclassified',
  risk_level TEXT NOT NULL DEFAULT 'Safe' CHECK (risk_level IN ('Safe', 'Moderate Risk', 'High Privacy Risk', 'Explicit Risk')),
  flag_status TEXT NOT NULL DEFAULT 'Not Flagged' CHECK (flag_status IN ('Flagged', 'Not Flagged')),
  lock_type TEXT CHECK (lock_type IN ('pin', 'face', 'eye')),
  lock_pin TEXT,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  misuse_detected BOOLEAN NOT NULL DEFAULT false,
  misuse_url TEXT,
  misuse_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own images" ON public.user_images FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own images" ON public.user_images FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own images" ON public.user_images FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own images" ON public.user_images FOR DELETE USING (auth.uid() = user_id);

-- Create complaints table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_id UUID REFERENCES public.user_images(id) ON DELETE SET NULL,
  complaint_id TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  detected_url TEXT,
  screenshot_ref TEXT,
  status TEXT NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Under Review', 'Action Taken', 'Resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own complaints" ON public.complaints FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own complaints" ON public.complaints FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'alert', 'success')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notifications" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('user-uploads', 'user-uploads', true);

CREATE POLICY "Users can upload own files" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (
  bucket_id = 'user-uploads'
);
CREATE POLICY "Users can delete own files" ON storage.objects FOR DELETE USING (
  bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON public.complaints FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
