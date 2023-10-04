import {} from "@dapplets/dapplet-extension";
import EXAMPLE_IMG from "./icons/example.png";
import pkg from "../dapplet.json";

@Injectable
export default class Dapplet {
  @Inject(Object.keys(pkg.dependencies)[0]) // It's better to explicitly specify the adapter name
  public adapter;

  async activate(): Promise<void> {
    const { bos } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: (post) => [
        bos({
          DEFAULT: {
            src: "dapplets.near/widget/RedButton",
            insertionPoint: "POST_AVATAR",
            label: "Avatar",
            onClick: () => console.log(post)
          },
        }),
        bos({
          DEFAULT: {
            src: "dapplets.near/widget/RedButton",
            insertionPoint: "POST_FULLNAME",
            label: "FullName",
            onClick: () => console.log(post)
          },
        }),
      ],
      PROFILE_POPUP: (profile) => [
        bos({
          DEFAULT: {
            src: "dapplets.near/widget/RedButton",
            insertionPoint: "PROFILE_POPUP_AVATAR",
            label: "Avatar",
            onClick: () => console.log(profile)
          },
        }),
        bos({
          DEFAULT: {
            src: "dapplets.near/widget/RedButton",
            insertionPoint: "PROFILE_POPUP_TEXT",
            label: "Text",
            onClick: () => console.log(profile)
          },
        }),
      ],
    });
  }
}
