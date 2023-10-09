import {} from "@dapplets/dapplet-extension";
import users from "./near-social-users.json";

/*
mybadge.near/widget/BadgeDapplet.Profile.Avatar.Near

mybadge.near/widget/BadgeDapplet.Profile.Fullname.Dapplets
mybadge.near/widget/BadgeDapplet.Profile.Fullname.Lnc
mybadge.near/widget/BadgeDapplet.Profile.Fullname.DevHacks

mybadge.near/widget/BadgeDapplet.Post.Fullname.Dapplets
mybadge.near/widget/BadgeDapplet.Post.Fullname.Lnc
mybadge.near/widget/BadgeDapplet.Post.Fullname.DevHacks

mybadge.near/widget/BadgeDapplet.Post.BeforeText.LncElite
mybadge.near/widget/BadgeDapplet.Post.BeforeText.NearVeteran
mybadge.near/widget/BadgeDapplet.Post.BeforeText.DevHacks

mybadge.near/widget/BadgeDapplet.ProfilePopup.AfterUsername.ProTester
mybadge.near/widget/BadgeDapplet.ProfilePopup.AfterUsername.ProTester
mybadge.near/widget/BadgeDapplet.ProfilePopup.AfterUsername.DappCreator
mybadge.near/widget/BadgeDapplet.ProfilePopup.AfterUsername.AlphaTester

// GENERIC COMPONENTS

mybadge.near/widget/Generic.AvatarBadge
  icon

mybadge.near/widget/Generic.CircleBadge
  backgroundColor
  icon

mybadge.near/widget/Generic.RectBadge
  iconBackgroundColor
  textBackgroundColor
  icon
  textColor

mybadge.near/widget/Generic.DetailedRectBadge
  backgroundColor
  textColor
  primaryText
  secondaryText

// NEAR

mybadge.near/widget/Near.AvatarBadge

// Dapplets

mybadge.near/widget/Dapplets.AvatarBadge
mybadge.near/widget/Dapplets.CircleBadge
mybadge.near/widget/Dapplets.DappCreator

*/

@Injectable
export default class {
  @Inject("twitter-bos-config")
  public adapter;

  public users = new Map(users.map((user) => [user.twitter, user]));

  async activate(): Promise<void> {
    const { bos } = this.adapter.exports;
    this.adapter.attachConfig({
      PROFILE: (profile) => {
        const user = this.users.get(profile.authorUsername)

        if (!user) return;

        return [
          bos({
            DEFAULT: {
              src: "mybadge.near/widget/Near.BigAvatarBadge",
              insertionPoint: "PROFILE_AVATAR"
            },
          }),
          bos({
            DEFAULT: {
              src: "mybadge.near/widget/Dapplets.CircleBadge",
              insertionPoint: "PROFILE_FULLNAME"
            },
          }),
          bos({
            DEFAULT: {
              src: "mybadge.near/widget/LNC.CircleBadge",
              insertionPoint: "PROFILE_FULLNAME"
            },
          }),
          bos({
            DEFAULT: {
              src: "mybadge.near/widget/DevHacks.CircleBadge",
              insertionPoint: "PROFILE_FULLNAME"
            },
          }),
        ]
      },
      POST: (post) => [
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/Dapplets.CircleBadge",
            insertionPoint: "POST_FULLNAME"
          },
        }),
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/LNC.CircleBadge",
            insertionPoint: "POST_FULLNAME"
          },
        }),
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/DevHacks.CircleBadge",
            insertionPoint: "POST_FULLNAME"
          },
        }),
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/Near.SmallAvatarBadge",
            insertionPoint: "POST_AVATAR"
          },
        }),
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/LNC.EliteBadge",
            insertionPoint: "TEXT_BEFORE"
          },
        }),
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/Near.VeteranBadge",
            insertionPoint: "TEXT_BEFORE"
          },
        }),
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/DevHacks.DevHacksBadge",
            insertionPoint: "TEXT_BEFORE"
          },
        }),
      ],
      PROFILE_POPUP: (profile) => [
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/Dapplets.DappCreatorBadge",
            insertionPoint: "PROFILE_POPUP_TEXT"
          },
        }),
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/Dapplets.DappCreatorBadge",
            insertionPoint: "PROFILE_POPUP_TEXT"
          },
        }),
        bos({
          DEFAULT: {
            src: "mybadge.near/widget/Dapplets.DappCreatorBadge",
            insertionPoint: "PROFILE_POPUP_TEXT"
          },
        }),
      ],
    });
  }
}
