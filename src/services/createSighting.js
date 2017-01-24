export const createSighting = (user, park, animal, userLocation, text, count) => {
  const sighting = {
    observer_id: user.id,
    animal_name: animal.common_name,
    park_id: park.id,
    animal_id: animal._id,
    lat_lng: userLocation,
    animal_name: animal.common_name,
    animal_id: animal._id,
    obs_comment: text,
    obs_abundance: +count
  };
  return sighting;
};
