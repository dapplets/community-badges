# Community Badges Dapplet

![image](https://github.com/dapplets/community-badges/blob/main/docs/readme-banner.jpg#gh-dark-mode-only)


## Short platform introduction


Dapplets provides tools for embedding Web3 applications into any web page without getting permission from its owner. We are using BOS-components to do that. 

Using Dapplets Browser Extension we have introduced technology called Mutable Web which allows any user to create a mutation of a page in a permissionless way and offer it to the community use instead of the original one.
![QiMiGKX](https://github.com/dapplets/community-badges/assets/51093278/84db20c9-63a0-4fd4-a75a-b683e83f2da6)


To illustrate the technology we developed Community Tools that customize and improve UX for the community on 3rd party websites like Twitter and Github to show badges to users who are members of the NEAR community, making them more visible. 

The community gets new tools for onboarding new members, and external members (Visitors) understand who's who in the NEAR community.  Other apps from the Community Tools set will follow.

## What we have built

Mutation is a set of applications like Community Tools, curated by DAO on behalf of the community, and targeting multiple websites. 
The role of mutation curator is similar to Linux distributor, where the user decides which distribution to use. 
Anyone can create a Mutation, which are competing for the audience.
In order to "apply" a mutation, the community first provides its users with a link to the intermediary site forwarding to the mutated website or asking to install the Extension if it is not installed yet. 
For example, the community can post this link on its official web2 information channel.

Here you can install Mutation to try it - [link](https://augm.link/?t=https%3A%2F%2Ftwitter.com%2FMrConCreator&m=dapplets.sputnik-dao.near%2Fcommunity&d=community-badges)

The user follows Mutation, which is applied automatically when a designated page is reached. Thus the mutated version becomes the default version for the community. The user can always select another mutation or turn it off. 
By activating the mutation the user begins to see badges and insignia in the Twitter profile related to the NEAR ecosystem.

Each UI change is a separate BOS component provided by the community. 
Here we use specially built Adapters that deal with semantic analysis of the page and provide insertion points and the ability to mount components on the fly. 

In the previous version, it was only possible to define a mutation replacing BOS components already inserted on the page. 
Now we have implemented the ability to insert BOS-component into all insertion points on the page provided by the adapter, regardless of whether something is inserted there or not.

Each badge is a BOS-component with its own function that is supported by a separate community that issues it.


Here are the badges that were implemented during the hackathon :

- Sign that the user has NEAR account connected to a web2 account.
- A badge showing community affiliation.
- A short version of the badge to display in a tweet
- Interactive badges - responsive to user actions  and evolving depending on on-chain data 

We asked two NEAR communities (Learn Near Club and DevHub) to provide us with a meaningful badge system that makes sense for users and implemented it.

For Learn Near Club it is a badge showing how many tokens a community member received for participating in beta tests, which is used as his rank in the community. 

For DevHub it is a badge that shows workgroup maintainers.

Thanks to the virtual adapter all badges are also shown on GitHub.

## Implementation details

![Mutation 3 (2)](https://github.com/dapplets/community-badges/assets/51093278/290cf1eb-7eea-4688-a9e7-31adc470dd9b)

Mutation fetches user community badges from a contract. 
The list of communities is managed by the mutation maintainer. 
The community itself manages the list of its users and badges.
It is up to the community to decide how badges are generated. 
They can simply create registries with user-badge pairs, or they can connect a smart contract checking a token or NFT ownership and return a response that the user has a certain badge and a badge component for demonstration.

Instead of a full-fledged registry with Twitter and GitHub account data, as a temporary solution, we used a JSON file obtained after processing data from near.social.

## Why it matters

We believe that the community needs such a tool, as it provides an opportunity to reward members and reflect the degree of human participation in the ecosystem. 
It is also a new way of communication with the community, marketing, and engagement of current and new audiences. 
NEAR Twitter Mutation targets 1.8 mln followers on NEAR's main account, engaging new people directly into NEAR community.

Thus, not only the site owner determines the UX, but also the user community. 
The user community becomes a self-sufficient well-organized economic entity, regardless of the sites it inhabits. 
This is a major paradigm shift in web architecture.

The community becomes capable of customizing 3rd party webpages for its needs. 
This is another major paradigm shift.


## Team
Alexander Sakhaev
Konstantin Iakovlev

## Related Links

[Demo Link](https://augm.link/?t=https%3A%2F%2Ftwitter.com%2FMrConCreator&m=dapplets.sputnik-dao.near%2Fcommunity&d=community-badges)

[Community Tools Dapplet](https://github.com/dapplets/community-badges/tree/main/dapplet)

[Smart-contract based Community Registry](https://github.com/dapplets/community-badges/blob/main/contract/community-registry/src/lib.rs)

[Smart-contract based Badge Registry](https://github.com/dapplets/community-badges/blob/main/contract/badge-registry/src/lib.rs)

[Developed BOS-components](https://github.com/dapplets/community-badges/tree/main/bos-components/mybadge.near)

[Showcase of the used BOS-components at near.org](https://near.org/mybadge.near/widget/Showcase)

[Dapplet Extension (forked branch near-bos)](https://github.com/dapplets/dapplet-extension/tree/near-bos)

[Twitter Adapter (forked branch near-bos)](https://github.com/dapplets/modules-monorepo/tree/near-bos/packages/adapters/twitter-bos-config)

[GitHub Adapter (forked branch near-bos)](https://github.com/dapplets/modules-monorepo/tree/near-bos/packages/adapters/github-bos-config)

## Getting Started

1.  Go to module folder and `npm i` to install dependences.
2.  `npm start` to run module at localhost.

### Option "adapter"

More about using the [adapter](https://docs.dapplets.org/docs/new-site-adapter).
More about using the Web Components for adapter [here](https://docs.dapplets.org/docs/web-components).

### Option "overlay"

More about using the [overlay](https://docs.dapplets.org/docs/overlay-login).

### Option "server"

More about using the [server](https://docs.dapplets.org/docs/server-connection)

## Learn more

- **Dapplets Project** - [dapplets site](https://dapplets.org/)
- **Documentation** - [documentation](https://docs.dapplets.org/docs/)
- **GitHub Project Dapplets** - [github](https://github.com/dapplets)
