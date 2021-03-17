---

title: 'Palantir Thesis'
date: 2021-03-07T19:53:54-08:00
category: 'Stocks'
template: 'post'
article: true
excerpt: 'My current thesis on $PLTR'
image: palantir.png
caption:
tags:
  - '#stocks'
  - '#investing'
  
---

# Business Software Landscape is Changing
Enterprise Resource Planning and customer relation management is dead. Systems are moving from human-centric to machine-centric software architecture. This means that business Consortiums will dominate. Companies need a way to leverage AI / ML and use signal data to take autonomous action in a business consortium. Thats what Palantir provides.

Hyperledger Fabric is the industry-standard private blockchain technology. It allows companies to cooperate semi-trustlessly.

![[Pasted image 20210308185425.png]]
*Figure: Sample of current business conortiums. Of note: DTCC, IBM, JP Morgan*

# Causing Massive Changes for Developers
Design challenges for developers surround the ever-increasing complexity of these systems. Challenges include:
 - Distributed transactions
- Event streaming
- Big data query and Feature Engineering
- Model Training and Inference
- Security

Companies are trying to out-compete each other. They must rapidly adopt new software architectures to collect as much data analyitcs as possible. That way they can surface signal data that they can act upon (using FaaS). To collect the data analytics, they need big data. 

![[Pasted image 20210308191151.png]]
*Example of challenging architecture complexity*

# Palantir is the Big Data OS
Palantir brings it's software to their customers. _Dedicated Foundry_ and _Dedicated Gotham_ allow Palantir to meet their customers’ specific data residency and isolation requirements. [They "maintain _a sky full of clouds_"](https://medium.com/palantir/a-sky-full-of-clouds-218b9db3f735) 

Together, Skylab and Apollo handle CI / CD, with upwards of 100,000 deployments per day.

## Skylab
Responsible for the life cycle (e.g., install, start, stop, upgrade) of each application and its configuration (RPC and service discovery, encryption keys, and other runtime configuration). Skylab follows a declarative model _similar to Kubernetes_: administrators set the expected final state, and Skylab makes it happen. It is the foundation upon which Gotham and Foundry operate.

## Apollo
Apollo acts as a puppet master for the Skylab. Each of the Skylab instances continually submits the current state of its environment, and Apollo compares the observed current state to the declared target state and computes a queue of change tasks to be applied for each of the environments to achieve the target. Apollo features include:
 - Continuous delivery
 - Safe delivery
 - Dependency resolution
 - Recalling buggy / unstable releases
 - Blue/Green deployment
 - Soak testing
 - Change management policies

## Gotham
The data aggregator. Map-and-merge pipeline that powers the knowledge graph. Allows for securing and tagging data. Essential for model training.

![[Pasted image 20210308193914.png]]

## Foundry
Data streaming for signal discovery. Supports natural language processing. "Turns one employee into one hundred."


## They use Typescript
https://github.com/palantir/?language=typescript

This is a company founded and run by engineers writing exceptional code.

## ERP and CRM is Dead
Enterprise Resource Planning and customer relation management is dead.

[ERP](https://dynamics.microsoft.com/en-us/erp/what-is-erp/) is a business process management software that manages and integrates a company’s financials, supply chain, operations, reporting, manufacturing, and human resource activities. ERP Systems are "a way to prop up old crappy systems and sell it to companies and pretend that it adds value."

[CRM](https://www.salesforce.com/crm/what-is-crm/) is a technology for managing all your company’s relationships and interactions with customers and potential customers. This speaks for itself: automate away the humans. (bye bye Salesforce)

## Partnerships

> [Palantir and IBM announced a partnership that ... combines key modules from Palantir Foundry with IBM’s AI for business capabilities and hybrid cloud data platform — Cloud Pak for Data.](https://medium.com/palantir/integrating-the-authentication-systems-of-ibm-cloud-pak-for-data-and-palantir-foundry-775c90c1e691)

Meanwhile, Palantir delivers its own ERP Suite optimized to run on AWS-- and it connects into Foundry of course!

> [_Global chemical company LANXESS has also adopted Palantir’s ERP Suite to derive more value from its ERP data. **Within days of installing** the ERP Suite, LANXESS had visibility into its end-to-end value chain across multiple ERPs and the_ **capabilities to simulate decisions and run complex what-if scenarios.**](https://medium.com/palantir/launching-erp-suite-to-deliver-cost-savings-for-aws-customers-ceed6e6dd927)

 It currently unproven that Amazon uses Palantir itself, but given that Amazon *uses every other part of AWS,* it is not unlikely. Do not confuse with the fact that [Palantir clients run on AWS](https://www.businessinsider.com/amazon-employees-letter-protest-palantir-ice-camps-2019-7?op=1)

# Challenges
## Silo Model
Palantir has a Silo Model SaaS platforms. This means each customer gets their own infrastructure. Silo models do not scale well-- as opposed to pool model (sharing underlying infrastruct but restricting with security policies). It has higher infrastructure cost; easy to get wrong; harder for dev-ops. There is speculation that Palantir is transitioning to pool model for enterprise customers, but that is costly.

## Google Cloud Platform
[Google Cloud Platform](https://www.capterra.com/big-data-software/compare/170983-156439/Google-Cloud-Platform-vs-Palantir-Gotham)

[Google's Knowledge Graph has over 500 billion facts about 5 billion entities](https://www.searchenginejournal.com/google-knowledge-graph/369484/) 🤯
They have solved most SaaS problems; they have it all. They might be able to squish Palantir.

## Snowflake? 
Snowflake seems to provide mostly on-cloud data warehousing while Palantir is big data/data analytics. Can the two possibly collaborate?



Source: https://www.youtube.com/watch?v=ZjIRX0snOCM