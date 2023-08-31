import { type Component } from "vue";
import KinTitle from "./KinTitle.vue";
import { MdEditor, MdPreview } from "md-editor-v3";
const components: {
  [propName: string]: Component;
} = {
  KinTitle,
  MdEditor,
  MdPreview,
};
export default components;
