import { DataType } from "../../../../types";

export const GetEventData = (
  eventTitle: string
): { headings: string[]; data: DataType[] } => {
  let headings: string[] = [];
  let data: DataType[] = [];

  switch (eventTitle) {
    case "Strategic Projects":
      headings = [
        "No",
        "Project Name",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Strategic Project Milestone":
      headings = [
        "No",
        "Project Name",
        "Milestone",
        "Start Date",
        "End Date",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Key Strategic Project Activity":
      headings = [
        "No",
        "Project Name",
        "KSP Activity",
        "Start Date",
        "End Date",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "BAU Projects":
      headings = [
        "No",
        "Project Name",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "BAU Project Milestone":
      headings = [
        "No",
        "Project Name",
        "Milestone",
        "Start Date",
        "End Date",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Key BAU Project Activity":
      headings = [
        "No",
        "Project Name",
        "KBP Activity",
        "Start Date",
        "End Date",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Technical Change Projects":
      headings = [
        "No",
        "Project Name",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Project Milestone":
      headings = [
        "No",
        "Project Name",
        "Milestone",
        "Start Date",
        "End Date",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Key Project Activities":
      headings = [
        "No",
        "Project Name",
        "KSP Activity",
        "Start Date",
        "End Date",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Annual Corporate Initiatives":
      headings = [
        "No",
        "Project Name",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Annual Strategic Planning":
      headings = [
        "No",
        "Annual Corporate Initiative",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "ASP Milestone":
      headings = [
        "No",
        "Milestone",
        "Start Date",
        "End Date",
        "Key Activity",
        "Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "ASP Key Activties":
      headings = ["No", "Key Activities", "Start Date", "End Date", "Manager"];
      data = [
        // Add your data rows here
      ];
      break;
    case "Annual Budgeting":
      headings = [
        "No",
        "Project Name",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "AB Milestones":
      headings = [
        "No",
        "Milestone",
        "Start Date",
        "End Date",
        "Key Activity",
        "Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "AB Key Activities":
      headings = ["No", "Key Activities", "Start Date", "End Date", "Manager"];
      data = [
        // Add your data rows here
      ];
      break;
    case "Shut Down":
      headings = [
        "No",
        "Project Name",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "SD Milestones":
      headings = [
        "No",
        "Milestone",
        "Start Date",
        "End Date",
        "Key Activity",
        "Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "SD Key Activities":
      headings = ["No", "Key Activities", "Start Date", "End Date", "Manager"];
      data = [
        // Add your data rows here
      ];
      break;
    case "Performance Review":
      headings = [
        "No",
        "Project Name",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "PR Milestones":
      headings = [
        "No",
        "Milestone",
        "Start Date",
        "End Date",
        "Key Activity",
        "Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "PR Key Activities":
      headings = ["No", "Key Activities", "Start Date", "End Date", "Manager"];
      data = [
        // Add your data rows here
      ];
      break;
    case "Regulatory Activities":
      headings = [
        "No",
        "Project Name",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "RA Milestones":
      headings = [
        "No",
        "Milestone",
        "Start Date",
        "End Date",
        "Key Activity",
        "Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "RA Key Activities":
      headings = ["No", "Key Activities", "Start Date", "End Date", "Manager"];
      data = [
        // Add your data rows here
      ];
      break;
    case "Others":
      headings = [
        "No",
        "Project Name",
        "Start Date",
        "End Date",
        "Milestone",
        "Key Activity",
        "Sponsor",
        "Project Manager",
        "Change Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Milestones":
      headings = [
        "No",
        "Milestone",
        "Start Date",
        "End Date",
        "Key Activity",
        "Manager",
      ];
      data = [
        // Add your data rows here
      ];
      break;
    case "Key Activities":
      headings = ["No", "Key Activities", "Start Date", "End Date", "Manager"];
      data = [
        // Add your data rows here
      ];
      break;
    default:
      // Set default headings and data
      headings = [];
      data = [];
      break;
  }

  return { headings, data };
};
