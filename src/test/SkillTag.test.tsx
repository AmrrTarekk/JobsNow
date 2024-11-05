import { render } from "@testing-library/react";
import SkillTag from "../components/SkillTag";

describe("SkillTag", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<SkillTag name="skill name" />);

    const skillTage = getByTestId("skillTag").textContent;
    expect(skillTage).toBe("skill name");
  });
});
