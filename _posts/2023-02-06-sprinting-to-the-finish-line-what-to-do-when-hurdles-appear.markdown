---
title: 'Sprinting to the finish line: what to do when hurdles appear'
date: 2023-02-06 09:53:00 Z
permalink: "/news/sprinting-to-the-finish-line"
categories:
- News
author: Triggerise
heroImage: "/uploads/john-cameron-kY2H30v6Bs4-unsplash.jpg"
layout: post
---

Over the course of this year, Triggerise has partnered with [Networking HIV & AIDS Community of Southern Africa](https://www.nacosa.org.za/) (NACOSA) as they work to establish a social impact bond (SIB) in HIV prevention and treatment for adolescent girls and young women in South Africa — we’ll refer to it as the Imagine SIB hereafter. As implementers ourselves, Triggerise runs programmes like this in other parts of Africa through our digital platform (Tiko), but for NACOSA, we are more like partners in the tech space. In this experimental partnership that consists of sprints wherein we test ideas, our hypothesis is as follows:

*Can we demonstrate the effectiveness and trustworthiness of using technology platforms like ours to verify outcomes directly and more efficiently?* This is important because, if successful, adopting a tech-driven approach to verify outcomes could drastically cut down the current time and cost involved without compromising on the accuracy and quality of the results. This will allow teams to spend more resources where it really matters: delivering impact.

To test this hypothesis, we are applying specific features of the Tiko platform to the Imagine SIB through an integration to Imagine’s digital M&E system. On the Triggerise/Tiko side, we will power the Ratings, Rewards, and Reminders through the modular and configurable Tiko platform. This allows for real-time analysis of programme performance and flags any suspicious activities for investigation by field teams based on defined algorithms. The data is available in a set of dashboards that guides project implementation (based on project indicators and platform health metrics) and calculates outcome indicators reported with a confidence interval, adjusted based on audit findings. Additional Tiko verification features, such as biometrics and GPS tracking, can be included in a future phase of the implementation to increase the robustness of the verification process.

Over these months of working together, it all concludes with this third sprint, which centred on the architectural design of what a standalone tool within the Tiko platform could look like for third-party results verification. In this post, we’ll explore what that process looked like for us, and what we learned along the way (learn more about the other sprints in blog posts [one](https://triggerise.org/news/five-things-weve-learned-about-collaboration-in-a-pilot-project-for-data-verification-of-social-impact-bonds) and [two](https://triggerise.org/news/six-common-pricing-models)).

**What did this sprint consist of?**

* *Gathered technical and operational details.* We outlined the programme requirements of the Imagine SIB with NACOSA (these elements include reward structures, reminder messages, services to be tracked, rating questions, restrictions, and more). We also listed high-level system specifications for our in-house tech team to take into development.
* *Designed the system architecture for a standalone verification solution built on our technology platform that can be integrated into third parties.* The output here was the architecture diagrams of the Tiko System (high-level architecture, Domain Message Flow Model, and a C4 container diagram).
* *Created a roadmap for the integration by understanding dependencies and the work effort involved.*

Fig. 1 Architectural Diagram for Digital Verification Solution on the Imagine SIB
![Screenshot 2023-02-06 120224.png](/uploads/Screenshot%202023-02-06%20120224.png)

At the time of publication, the Imagine SIB has not yet been signed by the South African government. However, all stakeholders are well-advanced in their planning, and we know the project will begin at full speed once the contract is signed. This prolonged period of unknown timelines creates uncertainty around the project, as we have little visibility on the schedule. As such, we created two work plans to mitigate the impact of the delays. That leads us to our first learning from this sprint.

**Build flexibility into planning**

As mentioned, we created two work plans for this sprint. In short, Plan A involved building the digital verification solution on Tiko, our recently re-architectured and custom platform (for more context, we are migrating our software from our original platform [Movercado] to subdomains [Tiko]). Under this plan, a significant amount of time is needed upfront to ensure the migration of certain features is successfully carried out. It would push delivery of the tool to mid-Q1 2023 (sometime around March). Plan B involves building the digital verification solution on the ‘old’ Movercado software and migrating the integration to the new Tiko platform at a later date. It allows us to go to market more quickly (mid-January 2023), but requires reworking further down the line to complete the migration.

These work plans have become two scenarios in our technology roadmap. For now, we will follow Plan B, ensuring we’ll be ready to go when the SIB’s contract is signed. However, we’ve included milestones and decision points throughout the plan so we can pivot to Plan A during the development process if time allows. Ultimately, we are choosing our partners first over getting the ideal tech solution. We’re creating a scenario where we can deliver this tool on the tight deadlines that might come our way if the contract is signed soon.

**Be open to change, even if it changes the whole plan**

We undertook this design process and were well on our way, assuming we’d build the tool on the new Tiko platform (Plan A). However, as we discovered, this is not the direction that’s best to continue in for now. Aside from the factors listed above, another major decision impacted our approach too.

An operational obstacle related to how rewards would be sent to users necessitated a redesign of the core components of our solution. This news set our team back, forcing a time-consuming rework. Naturally, this created some friction between teams who experienced a feeling of going back to the drawing board. We learned that this strain could have been alleviated if the communication between cross-functional teams flowed more openly and regularly. This significant hurdle contributed to the swing to Plan B; what seemed like a simple change actually had technical dependencies that the new Tiko platform was not yet ready for.

The architecture diagram is the blueprint for our engineers and stakeholders to build and roll out the integration. Despite the obstacles, we not only designed and delivered the system architecture diagram and flexible work plans but are also taking a set of learnings away with us. Over this sprint, our key takeaways include:

* building decision points that allow for flexibility in project plans;
* being open to change, even if it means changing the whole plan;
* having open conversations that emphasise the uncertain nature of the project with the relevant teams; and
* ensuring that there’s a strong link between operations and technology so that any change is escalated quickly.

More than anything, this sprint has got us thinking about what makes an ideal software and technology partner. What would it take for us to supply a verification solution to other impact bonds?

**What’s next for Triggerise?**

From our team’s perspective, we will build out the standalone verification solution so third parties can connect to Tiko’s verification features. We’ll roll out the solution on the Imagine SIB in Q2 2023. We are also excited to continue to learn about outcome verification and share our learnings along the way, adding our perspective to the exploration and broadening of this field. Most of all, we’re proud to contribute to the development of this programme and look forward to its activation in the near future.