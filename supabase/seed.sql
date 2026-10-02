-- Verified initial data only. Re-runnable: never overwrites rows that already exist.
-- Intentionally absent: support_url (no real support/donation URL exists -> Support CTA stays hidden),
-- contact_email (none verified).

insert into public.site_settings (key, value) values
  ('site_name',     'Vaazhkai'),
  ('tagline',       'For those who can’t ask.'),
  ('whatsapp_url',  'https://chat.whatsapp.com/E2aDXu35tNoImBUu4VINGh'),
  ('instagram_url', 'https://www.instagram.com/vaazhkai.organization/'),
  ('linkedin_url',  'https://www.linkedin.com/company/vaazhkai')
on conflict (key) do nothing;

-- Copy below is lifted from the existing site. No rescue date/location/history is stored; published_at left null on purpose.
insert into public.stories (slug, title, eyebrow, excerpt, body, image_key, image_alt, published) values
  ('sundaresan',
   'Meet Sundaresan.',
   'Vaazhkai’s first rescue',
   'Two days old when we rescued him.',
   'Sundaresan’s story began Vaazhkai’s journey toward doing more for animals who cannot ask for help.',
   'vaazhkai-cat',
   'Sundaresan, Vaazhkai’s first rescue, sleeping under a blanket',
   true)
on conflict (slug) do nothing;

insert into public.resources (title, description, url, published)
select 'Learn about community animals',
       'Not every unfamiliar animal is something to fear.',
       'https://helpanimalsindia.org/about/faq',
       true
where not exists (select 1 from public.resources where url = 'https://helpanimalsindia.org/about/faq');
