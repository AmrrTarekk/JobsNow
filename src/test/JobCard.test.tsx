import { MemoryRouter } from "react-router-dom";
import JobCard from "../components/JobCard";
import { render } from "@testing-library/react";

const dummyJob = {
  id: "1",
  title: "job title",
  detailedSkill: [
    {
      id: "1-1",
      name: "skill name",
    },
  ],
};

describe("JobCard", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <JobCard job={dummyJob} />
      </MemoryRouter>
    );

    const jobTitle = getByTestId("jobTitle").textContent;
    const jobLink = getByTestId("jobLink");

    expect(jobTitle).toBe("job title");
    expect(jobLink).toBeInTheDocument();
    expect(jobLink).toHaveAttribute("href", `/jobs/job/1`);
  });
});
