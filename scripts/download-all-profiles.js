var usersMap1 = await fetch("https://api.near.social/keys", {
  headers: { "content-type": "application/json" },
  body: '{"keys":["*/profile"],"options":{"return_type":"BlockHeight"}}',
  method: "POST",
}).then((x) => x.json());

var usersMap2 = await fetch("https://api.near.social/keys", {
  headers: { "content-type": "application/json" },
  body: '{"keys":["*"],"options":{"return_type":"BlockHeight"}}',
  method: "POST",
}).then((x) => x.json());

var users = Array.from(
  new Set([...Object.keys(usersMap1), ...Object.keys(usersMap2)])
);

var profiles = [];

for (const user of users) {
  const profile = await fetch("https://api.near.social/get", {
    headers: { "content-type": "application/json" },
    body: '{"keys":["' + user + '/profile/linktree/**"]}',
    method: "POST",
  }).then((x) => x.json());

  profiles.push(profile);
}

var plainProfiles = profiles
  .filter((profile) => Object.keys(profile).length > 0)
  .map((profile) => ({
    near: Object.keys(profile)[0],
    ...profile[Object.keys(profile)[0]].profile.linktree,
  }));
