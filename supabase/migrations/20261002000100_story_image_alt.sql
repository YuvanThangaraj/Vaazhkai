-- The site's story image needs real alt text (accessibility); stories had no column for it.
alter table public.stories add column image_alt text;

-- Same alt text the existing site already uses for this photo.
update public.stories
   set image_alt = 'Sundaresan, Vaazhkai’s first rescue, sleeping under a blanket'
 where slug = 'sundaresan' and image_alt is null;
