# Product Requirements Document: AI-Native Workflows (Pillar 4)

**Version:** 1.0
**Date:** December 2024
**Status:** Draft
**Owner:** GWI Growth Platform Team

---

## Executive Summary

AI-Native Workflows represent a fundamental shift in how users interact with GWI—from manual, query-based research to AI-driven, conversation-first analysis. This pillar transforms GWI from a traditional dashboard into an intelligent co-pilot that understands intent, synthesizes insights across datasets, and proactively suggests next steps. By making AI the primary interface, we dramatically lower the barrier to entry while enabling power users to accomplish complex analysis faster than ever.

**Key Objectives:**
- Reduce time-to-first-insight from 18 minutes to <2 minutes via natural language queries
- Enable non-analyst users (60% of target market) to self-serve insights without training
- Increase dataset utilization by 4.5x through AI-driven cross-dataset synthesis
- Drive 50% of platform interactions through AI interfaces within 18 months

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Goals & Success Metrics](#goals--success-metrics)
3. [User Personas & Scenarios](#user-personas--scenarios)
4. [Feature Specifications](#feature-specifications)
5. [Technical Architecture](#technical-architecture)
6. [AI/ML Requirements](#aiml-requirements)
7. [User Experience Design](#user-experience-design)
8. [Data Strategy](#data-strategy)
9. [Testing & Validation](#testing--validation)
10. [Rollout Strategy](#rollout-strategy)

---

## Problem Statement

### Current State

GWI's current interface is built for data analysts—requiring users to understand data structures, construct queries, and manually correlate findings. This creates significant barriers:

1. **Steep Learning Curve**: 73% of new users don't complete their first analysis without support
2. **Analyst Dependency**: Marketing/executive users (60% of market) rely on analysts, creating bottlenecks
3. **Siloed Analysis**: Users analyze one dataset at a time, missing cross-dataset insights (87% never cross-reference datasets)
4. **Slow Exploration**: Finding relevant insights requires 18 minutes avg (navigation, filters, tabs)
5. **Low Feature Utilization**: 78% of users only use 3 core features; advanced capabilities remain undiscovered

### Impact

- **Addressable Market Constrained**: Can only serve analyst personas (~40% of TAM)
- **High Churn**: 34% of users churn within 90 days citing "too complex"
- **Low NPS Among Non-Analysts**: Marketers give 23 NPS vs. analysts at 58 NPS
- **Missed Insights**: Complex correlations across datasets require manual synthesis (rarely done)
- **Support Burden**: 62% of support tickets are "How do I...?" questions

### Vision

Transform GWI into an AI-first platform where:
- Natural language replaces complex queries: "Show me Gen Z sustainability trends" → instant insights
- AI agents proactively suggest analyses: "I noticed a spike in... would you like to explore?"
- Cross-dataset synthesis happens automatically: AI correlates patterns across all relevant data
- Persistent AI assistant learns user goals and provides contextualized help
- Reactivation intelligence brings back dormant users with personalized re-engagement

**Result**: Anyone can extract insights without training; analysts accomplish in minutes what used to take hours.

---

## Goals & Success Metrics

### Primary Goals

1. **Democratize Access**
   - Target: 60% of active users are non-analysts (vs. 22% today)
   - Mechanism: Natural language query, guided workflows, AI suggestions

2. **Accelerate Time-to-Insight**
   - Target: Reduce median time-to-first-insight from 18 min to <2 min
   - Mechanism: Natural language → instant results, no navigation required

3. **Increase Dataset Utilization**
   - Target: 4.5x increase in avg datasets used per analysis (from 1.2 to 5.4)
   - Mechanism: AI-driven cross-dataset synthesis, automatic correlation detection

4. **Drive AI Adoption**
   - Target: 50% of platform interactions via AI interfaces within 18 months
   - Mechanism: Persistent agent, NL query as default homepage, AI shortcuts everywhere

### Success Metrics

| Metric | Baseline | Target (6 mo) | Target (12 mo) | Target (18 mo) |
|--------|----------|---------------|----------------|----------------|
| Time-to-First-Insight | 18 min | 8 min | 3 min | <2 min |
| % Non-Analyst Users | 22% | 35% | 48% | 60% |
| Avg Datasets per Analysis | 1.2 | 2.5 | 4.0 | 5.4 |
| % Interactions via AI | 5% | 20% | 35% | 50% |
| NL Query Success Rate | N/A | 72% | 82% | 90% |
| AI Agent Engagement Rate | N/A | 48% | 63% | 75% |
| Cross-Dataset Insights Generated | 0 | 12K/mo | 45K/mo | 120K/mo |
| Support "How do I?" Tickets | 62% | 45% | 28% | <15% |

### Leading Indicators

- Daily NL queries per user
- AI agent message volume
- Cross-dataset synthesis requests
- Bookmark/share rate for AI-generated insights
- User satisfaction (CSAT) for AI responses

---

## User Personas & Scenarios

### Persona 1: Rachel - The Marketing Manager (Non-Analyst)

**Profile:**
- 5 years in marketing, no data analysis background
- Needs quick insights to inform campaigns
- Currently depends on analyst colleague who is overloaded

**Jobs to Be Done:**
- Understand target audience without building complex queries
- Get quick answers to campaign questions ("Should we target Gen Z or Millennials?")
- Discover unexpected insights she didn't know to ask about

**AI Workflow Needs:**
- Natural language query as primary interface
- AI agent that guides her through exploration
- Plain-English explanations, no technical jargon
- Suggestions for related insights ("You might also want to see...")

**Success Scenario:**
> "Rachel opens GWI and types: 'What are Gen Z's attitudes toward sustainable fashion?' She gets an instant summary with key stats, sentiment trends, and breakdowns by region. The AI suggests: 'I also found high interest in secondhand shopping—would you like to explore?' Rachel clicks yes and discovers an insight that shapes her campaign strategy. Total time: 90 seconds."

### Persona 2: David - The Senior Analyst (Power User)

**Profile:**
- 8 years in market research, expert GWI user
- Conducts complex multi-dataset analyses
- Frustrated by repetitive manual work

**Jobs to Be Done:**
- Correlate patterns across 5-10 datasets simultaneously
- Identify anomalies and emerging trends quickly
- Automate repetitive analysis workflows

**AI Workflow Needs:**
- Advanced cross-dataset synthesis
- AI-suggested correlations and anomalies
- Ability to refine AI outputs with follow-up questions
- Export AI findings to reports/presentations

**Success Scenario:**
> "David needs to analyze sustainable tech adoption across demographics, geography, and income levels—spanning 6 datasets. Instead of manually querying each and building correlations in Excel, he uses Cross-Dataset Synthesis. The AI identifies 12 significant correlations, flags 3 anomalies, and generates a summary report. David refines with follow-ups: 'Break down the 25-34 segment by income.' AI responds instantly. What used to take 3 hours takes 15 minutes."

### Persona 3: Jennifer - The Executive (Casual User)

**Profile:**
- CMO at mid-size company
- Logs into GWI monthly for board prep
- Wants high-level insights, not granular data

**Jobs to Be Done:**
- Get executive summary of market trends
- Answer specific strategic questions ("Is our target market growing?")
- Find compelling stats for presentations

**AI Workflow Needs:**
- Conversational interface that understands ambiguous questions
- Executive-friendly summaries (bullets, key stats, no charts unless asked)
- One-click export to slides
- Persistent agent that remembers her focus areas

**Success Scenario:**
> "Jennifer asks the AI: 'Give me a 3-bullet summary of major consumer trends this quarter.' AI responds with concise, exec-level bullets. She follows up: 'Which of these affects our 30-40 year-old urban target?' AI refines the answer. Jennifer exports to her board deck. Done in 3 minutes without navigating menus or running queries."

---

## Feature Specifications

### Feature 1: Natural Language Query Interface

**Description:**
Make natural language the primary way users interact with GWI. Users type questions in plain English; AI interprets intent, queries data, and returns insights instantly.

**User Stories:**
- As a marketer, I want to ask questions in plain English so I can get insights without learning query syntax
- As an analyst, I want to refine AI results with follow-up questions so I can drill down efficiently
- As an executive, I want concise answers to strategic questions so I can make decisions quickly

**Functional Requirements:**

1. **Query Input**
   - Prominent search bar on homepage and all pages
   - Support for complex, multi-part questions
   - Voice input option (future)
   - Query suggestions as user types
   - Recent queries history (bookmarked and auto-saved)

2. **Intent Understanding**
   - Parse user intent from ambiguous queries
   - Identify target audience (e.g., "millennials", "30-40 year-olds", "urban consumers")
   - Recognize analysis types (trends, comparisons, correlations, breakdowns)
   - Handle typos and colloquialisms
   - Support multiple languages (future: Spanish, French, German)

3. **Response Formats**
   - **Insight Summary**: 2-3 sentence answer with key stat
   - **Chart/Visualization**: Auto-generated charts for quantitative questions
   - **Table**: Comparison tables for multi-option questions
   - **Recommendation**: AI-suggested actions based on findings
   - **Related Questions**: Suggestions for follow-up exploration

4. **Iterative Refinement**
   - Support follow-up questions in conversational thread
   - Maintain context across multiple queries
   - "Refine" button to adjust results (e.g., change date range, audience filter)
   - "Explain" button for transparency (show data sources, methodology)

5. **Query Performance**
   - <3 second response time for 90% of queries
   - <10 second for complex cross-dataset queries
   - Progress indicators for long-running queries
   - Ability to cancel in-progress queries

6. **Error Handling**
   - Graceful failure messages: "I couldn't find data on X. Try asking about Y instead."
   - Clarifying questions when intent is ambiguous
   - Suggest alternative phrasings
   - Escalation to human support if AI can't help

**Technical Requirements:**
- LLM integration (GPT-4, Claude, or fine-tuned model)
- Query parser (NLP pipeline for entity extraction, intent classification)
- Semantic search over GWI datasets
- Response caching (Redis) for common queries
- Query rewriting for optimization
- Logging for model improvement

**Design Specifications:**
- Large, prominent search bar (Google-style)
- Autocomplete with popular queries
- Skeleton loaders during processing
- Expandable result cards
- Clean, scannable typography
- Mobile-optimized (voice input on mobile)

**Acceptance Criteria:**
- [ ] 90% of queries return results in <3 seconds
- [ ] 82% query success rate (useful result without refinement)
- [ ] 60% of users try NL query within first session
- [ ] 4.2 avg follow-up questions per query thread (indicates engagement)

---

### Feature 2: Persistent AI Agent

**Description:**
An always-present AI assistant that lives in the workspace, learns user goals, proactively suggests analyses, and provides contextual help. Think of it as a research partner embedded in the product.

**User Stories:**
- As a user, I want an AI assistant that remembers my projects so I don't repeat context
- As a user, I want proactive suggestions based on my activity so I discover relevant insights
- As a user, I want to ask the AI for help without leaving my current screen

**Functional Requirements:**

1. **Agent Presence**
   - Persistent chat interface (expandable sidebar or floating widget)
   - Always accessible via keyboard shortcut (Cmd+K or Cmd+J)
   - Minimizable but visible indicator (unread count badge)
   - Works across all pages without losing context

2. **Proactive Suggestions**
   - Suggest analyses based on current dataset: "I noticed a spike in... want to explore?"
   - Recommend related datasets: "Users analyzing X often look at Y dataset"
   - Highlight anomalies: "This trend is unusual compared to last quarter"
   - Offer shortcuts: "You can do this faster by..."

3. **Contextual Awareness**
   - Knows what page user is on (dataset view, report builder, etc.)
   - Remembers recent queries and datasets accessed
   - Understands user's role and typical workflows
   - Maintains conversation history (last 30 days)

4. **Help & Guidance**
   - Answer "how do I...?" questions
   - Provide inline tutorials ("Want me to show you how to do that?")
   - Troubleshoot errors ("It looks like your filter is too restrictive. Try...")
   - Explain features ("This chart type is best for comparing categories")

5. **Task Assistance**
   - Execute actions via chat: "Export this to PDF" → done
   - Build queries via conversation: "Show me... then filter by... now break down by..."
   - Schedule analyses: "Run this query weekly and send results to my email"
   - Manage bookmarks: "Save this insight to my 'Q4 Campaign' folder"

6. **Learning & Personalization**
   - Learn user preferences (preferred chart types, common filters)
   - Adapt communication style (concise for execs, detailed for analysts)
   - Improve suggestions based on feedback (thumbs up/down)
   - Prioritize notifications based on user engagement patterns

**Technical Requirements:**
- LLM-based conversational AI
- Context management system (conversation state, user profile)
- Action execution framework (map intents to API calls)
- Real-time streaming responses (SSE or WebSockets)
- Feedback loop (track suggestion acceptance rate)

**Design Specifications:**
- Friendly bot avatar (GWI mascot)
- Chat bubbles with clear user/agent distinction
- Action buttons for suggested tasks
- Collapsible message history
- Typing indicator for AI responses
- Dark mode support

**Acceptance Criteria:**
- [ ] Agent accessible in <1 second from any page
- [ ] 75% of users engage with agent within first week
- [ ] 60% suggestion acceptance rate
- [ ] <2 second latency for chat responses
- [ ] Agent executes actions correctly 95% of the time

---

### Feature 3: Cross-Dataset Synthesis

**Description:**
AI-powered feature that analyzes multiple datasets simultaneously, identifies correlations, and surfaces insights that would be impossible to find manually.

**User Stories:**
- As an analyst, I want to see correlations across datasets so I find hidden patterns
- As a researcher, I want AI to do the heavy lifting of multi-dataset analysis
- As a strategist, I want to understand how different trends interconnect

**Functional Requirements:**

1. **Dataset Selection**
   - Browse available datasets by category
   - Multi-select up to 10 datasets
   - Preview dataset summary (size, update frequency, key fields)
   - Saved dataset collections for repeat analyses

2. **Synthesis Triggers**
   - Manual: User selects datasets and clicks "Synthesize"
   - Auto: AI suggests synthesis when user views related datasets
   - Scheduled: Run synthesis weekly/monthly and email results

3. **Analysis Types**
   - **Correlation Detection**: Find statistically significant correlations across datasets
   - **Trend Alignment**: Identify trends that move together (or inversely)
   - **Audience Overlap**: Discover shared characteristics across different studies
   - **Causal Inference**: Suggest potential cause-effect relationships (with caveats)

4. **Output Formats**
   - **Summary Report**: Natural language summary of key findings
   - **Correlation Matrix**: Visual heatmap of field correlations
   - **Insight Cards**: Individual insights with supporting data
   - **Recommendations**: AI-suggested actions based on synthesis

5. **Confidence & Transparency**
   - Confidence score for each finding (0-100%)
   - Show underlying data sources
   - Explain methodology in plain English
   - Highlight limitations (e.g., "correlation ≠ causation")
   - Allow users to drill into raw data

6. **Refinement & Filtering**
   - Filter by time period
   - Filter by audience segment
   - Exclude irrelevant fields
   - Adjust sensitivity (only show high-confidence findings)

**Technical Requirements:**
- Statistical analysis engine (Pandas, NumPy, SciPy)
- Correlation algorithms (Pearson, Spearman, mutual information)
- Causal inference models (optional: Causal Impact, DoWhy)
- Visualization library (D3.js, Plotly)
- Async job processing (analysis can take 1-3 minutes)

**Design Specifications:**
- Dataset picker with search and filter
- Progress bar during synthesis
- Interactive correlation matrix
- Expandable insight cards
- Export to PDF/PPT

**Acceptance Criteria:**
- [ ] Synthesize 5 datasets in <90 seconds
- [ ] Identify correlations with 87%+ accuracy (vs. manual analysis)
- [ ] 120K+ cross-dataset insights generated per month
- [ ] 68% of synthesis results bookmarked or shared (indicates value)

---

### Feature 4: Reactivation Intelligence

**Description:**
AI system that identifies dormant users, predicts churn risk, and automatically creates personalized re-engagement campaigns.

**User Stories:**
- As a CSM, I want to know which customers are at churn risk so I can intervene proactively
- As a product manager, I want to understand why users go dormant so we can improve retention
- As a marketer, I want automated re-engagement campaigns that bring users back

**Functional Requirements:**

1. **Dormancy Detection**
   - Flag users who haven't logged in for 14/30/60 days (configurable threshold)
   - Segment by previous engagement level (high/medium/low)
   - Calculate potential value (based on plan tier, past usage, team size)
   - Predict churn probability using ML model

2. **Root Cause Analysis**
   - Identify likely reasons for dormancy:
     - Completed initial research (one-time use case)
     - Overwhelmed by complexity (low feature adoption)
     - Replaced by competitor
     - Organizational change (lost champion)
     - Lack of relevant data (industry/geo mismatch)

3. **Reactivation Strategies**
   - **New Features**: Highlight features added since last visit
   - **Personalized Insights**: AI-generated insights based on past interests
   - **Limited-Time Offer**: Exclusive access or premium feature trial
   - **Peer Success**: Case studies from similar companies
   - **Dedicated Onboarding**: Offer 1:1 training session

4. **Campaign Builder**
   - Select dormant user segment
   - Choose reactivation strategy (or let AI recommend)
   - Customize message template
   - Set delivery channel (email, in-app, Slack)
   - Schedule send time (or send immediately)

5. **Results Tracking**
   - Track campaign performance:
     - Emails sent, opened, clicked
     - Users reactivated (logged in within 7 days)
     - Feature adoption post-reactivation
     - Churn prevented (estimated LTV saved)
   - Compare strategy effectiveness
   - A/B test different approaches

6. **Automated Workflows**
   - Auto-trigger campaigns based on rules:
     - "If user inactive >30 days AND prev engagement = high → send Strategy #2"
   - Drip campaigns (sequence of 3-4 touchpoints over 2 weeks)
   - Stop campaigns if user reactivates

**Technical Requirements:**
- Churn prediction model (logistic regression or gradient boosting)
- Email/notification service integration
- Campaign management system
- A/B testing framework
- Analytics dashboard (Metabase, Looker, or custom)

**Design Specifications:**
- Alert dashboard with dormant user list
- Strategy selection cards with success rate badges
- Campaign builder with drag-and-drop
- Results dashboard with key metrics

**Acceptance Criteria:**
- [ ] Identify dormant users within 24 hours of threshold
- [ ] Reactivate 22% of high-value dormant users
- [ ] Predict churn with 78%+ accuracy
- [ ] Automate 60% of reactivation campaigns (vs. manual CSM outreach)

---

## Technical Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     AI-Native Workflow Layer                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │   Natural     │  │  Persistent  │  │  Cross-Dataset       │ │
│  │   Language    │  │    Agent     │  │  Synthesis Engine    │ │
│  │   Query API   │  │   Service    │  │                      │ │
│  └───────┬───────┘  └──────┬───────┘  └──────────┬───────────┘ │
│          │                 │                      │             │
│          └─────────────────┴──────────────────────┘             │
│                            │                                     │
│                   ┌────────▼────────┐                           │
│                   │   AI Orchestrator│                           │
│                   │  (LLM + Tools)   │                           │
│                   └────────┬────────┘                           │
│                            │                                     │
│          ┌─────────────────┼─────────────────┐                 │
│          │                 │                 │                 │
│   ┌──────▼──────┐  ┌───────▼──────┐  ┌──────▼─────────┐      │
│   │ Query       │  │ Conversation │  │  Reactivation  │      │
│   │ Parser      │  │ State Mgmt   │  │  Intelligence  │      │
│   └─────────────┘  └──────────────┘  └────────────────┘      │
│          │                 │                 │                 │
│   ┌──────▼─────────────────▼─────────────────▼──────────────┐ │
│   │              GWI Data Layer                              │ │
│   │  (Datasets, Analytics Engine, User Profiles, Metadata)  │ │
│   └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Component Architecture

#### 1. AI Orchestrator
- **Purpose**: Central brain that coordinates all AI workflows
- **Tech Stack**: Python, LangChain or custom orchestration
- **Responsibilities**:
  - Route requests to appropriate AI models
  - Manage tool calling (query data, generate charts, execute actions)
  - Handle multi-step workflows (plan → execute → refine)
  - Aggregate results from multiple sources
  - Stream responses to frontend (SSE)

#### 2. Natural Language Query API
- **Purpose**: Convert natural language to data queries and results
- **Tech Stack**: FastAPI, OpenAI/Anthropic API, PostgreSQL
- **Responsibilities**:
  - Parse user query (entity extraction, intent classification)
  - Generate SQL/query from natural language
  - Execute query against data warehouse
  - Format results for presentation
  - Cache frequent queries (Redis)

#### 3. Persistent Agent Service
- **Purpose**: Stateful conversational AI that assists users
- **Tech Stack**: Node.js, OpenAI Assistants API or custom
- **Responsibilities**:
  - Maintain conversation history per user
  - Generate proactive suggestions based on context
  - Execute actions (create reports, run queries, send emails)
  - Provide help and guidance
  - Learn from user feedback

#### 4. Cross-Dataset Synthesis Engine
- **Purpose**: Statistical analysis across multiple datasets
- **Tech Stack**: Python, Pandas, Scikit-learn, Dask (for large datasets)
- **Responsibilities**:
  - Load and join multiple datasets
  - Compute correlations and statistical relationships
  - Detect anomalies and trends
  - Generate natural language summaries of findings
  - Create visualizations

#### 5. Reactivation Intelligence
- **Purpose**: Churn prediction and automated re-engagement
- **Tech Stack**: Python, Scikit-learn, Airflow (scheduling)
- **Responsibilities**:
  - Identify dormant users
  - Predict churn probability
  - Recommend reactivation strategies
  - Generate personalized campaign content
  - Track campaign performance

### Data Flow

1. **User Query**: User types question → NL Query API parses → AI Orchestrator routes
2. **Agent Suggestion**: Agent monitors user activity → detects opportunity → generates suggestion → streams to UI
3. **Cross-Dataset Analysis**: User selects datasets → Synthesis Engine loads data → computes correlations → returns insights
4. **Reactivation**: Scheduled job identifies dormant users → predicts churn → creates campaigns → sends via email/Slack

### Model Architecture

#### Primary LLM
- **Model**: GPT-4 Turbo or Claude 3 Opus (or fine-tuned Llama)
- **Role**: Natural language understanding, generation, reasoning
- **Deployment**: API (OpenAI/Anthropic) or self-hosted (vLLM, TensorRT-LLM)

#### Query Generation Model
- **Model**: Fine-tuned T5 or specialized text-to-SQL model
- **Role**: Convert natural language to database queries
- **Training**: Supervised learning on <question, SQL> pairs from GWI data

#### Embedding Model
- **Model**: OpenAI text-embedding-3 or sentence-transformers
- **Role**: Semantic search over datasets, query similarity
- **Use Cases**: Find relevant datasets, suggest related queries

### Infrastructure

- **Hosting**: AWS or Google Cloud
- **Compute**: GPU instances for LLM inference (A100 or H100)
- **Database**: PostgreSQL (relational), MongoDB (conversation state)
- **Cache**: Redis (query results, embeddings)
- **Queue**: AWS SQS or RabbitMQ (async jobs)
- **Monitoring**: Datadog, Prometheus, Grafana

### Scalability

- **Query API**: Horizontally scalable; stateless
- **Agent Service**: Sticky sessions per user; scale by user count
- **Synthesis Engine**: Background jobs; scale workers based on queue depth
- **LLM Inference**: Autoscaling GPU instances; use vLLM for high throughput

---

## AI/ML Requirements

### Natural Language to Query (NL2SQL)

**Objective**: Convert user questions to executable database queries

**Training Data**:
- 50K+ <question, SQL> pairs (synthetic + human-labeled)
- GWI-specific schema and terminology
- Edge cases (ambiguous questions, typos, complex joins)

**Model**: Fine-tuned T5 or CodeLLM (StarCoder, CodeGen)

**Evaluation**:
- Exact match accuracy (query produces correct results)
- Execution success rate (query runs without errors)
- User satisfaction (thumbs up/down on results)

**Challenges**:
- Ambiguity resolution ("young adults" = 18-24? 25-34?)
- Multi-table joins (query spans 5+ tables)
- Temporal expressions ("last quarter", "year-over-year")

**Mitigation**:
- Clarifying questions when ambiguous
- Schema-aware prompting (include table/column descriptions)
- Query rewriting for optimization

---

### Churn Prediction Model

**Objective**: Predict which users will churn in next 30/60/90 days

**Features**:
- Usage metrics: logins, queries, datasets accessed, features used
- Engagement trends: declining activity, session length drop
- User attributes: plan tier, company size, industry, role
- Behavioral signals: support tickets, NPS score, feedback

**Model**: Gradient Boosting (XGBoost, LightGBM) or Neural Network

**Target**: Binary classification (churn / no churn) + churn probability

**Evaluation**:
- Precision/Recall/F1 at various thresholds
- ROC-AUC (target: 0.78+)
- Calibration (predicted probabilities match actual churn rates)

**Retraining**: Monthly with new churn data

---

### Cross-Dataset Correlation Detection

**Objective**: Identify statistically significant correlations across datasets

**Methods**:
- Pearson correlation (linear relationships)
- Spearman correlation (monotonic relationships)
- Mutual information (non-linear relationships)
- Partial correlation (control for confounders)

**Significance Testing**:
- p-value threshold: 0.01 (Bonferroni correction for multiple testing)
- Effect size: only report correlations with r > 0.3

**Interpretation**:
- LLM generates natural language explanation
- Cautions against causal claims ("correlation ≠ causation")
- Suggests potential mechanisms

---

### Agent Proactive Suggestions

**Objective**: Suggest relevant analyses based on user context

**Triggers**:
- User views dataset → suggest related datasets
- User runs query → suggest refinements or related queries
- Anomaly detected → suggest investigation
- Inactivity for 2 min → suggest popular analyses for this dataset

**Ranking**:
- Relevance score (semantic similarity to current task)
- Popularity (how often other users follow this path)
- Novelty (user hasn't seen this before)
- Diversity (don't repeat same suggestion type)

**Acceptance Tracking**:
- Click-through rate on suggestions
- Task completion after accepting suggestion
- User feedback (dismiss, rate as helpful/unhelpful)

---

## User Experience Design

### NL Query Interface

**Layout**:
- Centered search bar (Google-style) on homepage
- Persistent search in top navigation on all pages
- Expandable results panel (doesn't navigate away from current page)

**Interactions**:
- Type-ahead suggestions
- Voice input button (mobile)
- Recent queries dropdown
- One-click to refine (filters, date range)

**States**:
- Empty: Show popular queries, recent queries
- Loading: Skeleton screen with animated bars
- Success: Result cards with chart/table/summary
- Error: Friendly message with alternative suggestions

---

### Persistent Agent

**Layout**:
- Floating chat widget (bottom-right corner)
- Expandable to sidebar (covers ~30% of screen)
- Keyboard shortcut (Cmd+K) to open/close

**Personality**:
- Friendly but professional
- Proactive but not annoying (max 2 unsolicited messages per session)
- Adaptive tone (concise for busy users, detailed for learners)

**Message Types**:
- Suggestions: "💡 I noticed... would you like to...?"
- Help: "📚 Here's how you can..."
- Actions: "✅ Done! I've exported your report."
- Errors: "❌ Hmm, that didn't work. Try..."

---

### Cross-Dataset Synthesis

**Workflow**:
1. Dataset selection screen (multi-select with previews)
2. Loading state (progress bar: "Analyzing correlations... 45%")
3. Results screen:
   - Summary at top (key findings in 3-4 bullets)
   - Correlation matrix (interactive heatmap)
   - Insight cards (expand for details)
   - Export button (PDF/PPT)

**Visualizations**:
- Heatmap for correlation matrix
- Scatter plots for specific correlations
- Venn diagrams for audience overlap

---

### Reactivation Dashboard

**Layout**:
- Alert banner (top): "23 high-value users at churn risk"
- Table of dormant users (sortable by risk score, potential value)
- Campaign builder (modal or side panel)
- Results dashboard (campaign performance metrics)

**Interactions**:
- Select users (checkboxes)
- Choose strategy (cards with success rate badges)
- Preview message template
- Schedule or send immediately

---

## Data Strategy

### Training Data Collection

1. **Query Logs**: All NL queries + resulting SQL (for NL2SQL model)
2. **User Feedback**: Thumbs up/down, query refinements, abandonment
3. **Usage Analytics**: Feature adoption, session flows, time-on-task
4. **Churn Labels**: Historical churn data (who churned when)
5. **Expert Annotations**: Analysts label ambiguous queries, validate correlations

### Data Privacy & Ethics

- **User Consent**: Disclose that AI uses activity data for personalization
- **Data Minimization**: Only use data necessary for AI features
- **Anonymization**: Aggregate learnings across users (no individual profiling for marketing)
- **Right to Opt-Out**: Allow users to disable AI personalization
- **Bias Monitoring**: Regularly audit for demographic biases in suggestions

### Continuous Learning

- **Feedback Loop**: User ratings → model retraining → improved suggestions
- **A/B Testing**: Test new models against baseline (5% traffic)
- **Human-in-Loop**: Analysts review flagged AI outputs (low confidence, user-reported issues)
- **Explainability**: Log AI decision-making for debugging and transparency

---

## Testing & Validation

### Unit Testing
- Query parser: 1,000+ test cases (edge cases, ambiguity, errors)
- Correlation detection: Synthetic data with known correlations
- Agent actions: Mock all external APIs, verify correct execution

### Integration Testing
- End-to-end NL query flow (frontend → API → database → frontend)
- Cross-dataset synthesis with real GWI datasets
- Reactivation campaign creation and delivery

### Model Validation
- NL2SQL: Exact match on 500-query test set (target: 78%+ accuracy)
- Churn prediction: Holdout test set (6 months of data)
- Correlation detection: Compare to manual analyst findings (87%+ agreement)

### User Acceptance Testing (UAT)
- 50 users (mix of analysts, marketers, executives)
- Task-based scenarios (find insight, ask follow-up, synthesize datasets)
- Metrics: task completion rate, time-on-task, satisfaction (SUS score)
- Qualitative feedback: interviews, open-ended survey

### Performance Testing
- Load test: 1,000 concurrent NL queries
- Latency: p95 response time <3 seconds
- Agent scalability: 10,000 concurrent chat sessions

---

## Rollout Strategy

### Phase 1: Alpha (Month 1-2)
- **Scope**: NL query + Agent, 50 internal users + 30 beta customers
- **Features**: Basic NL query, agent suggestions (limited)
- **Goals**: Validate core AI performance, gather feedback on UX
- **Success**: 72% query success rate, positive qualitative feedback

### Phase 2: Private Beta (Month 3-4)
- **Scope**: All features, 500 users (mix of personas)
- **Features**: NL query, Agent, Cross-Dataset Synthesis (no Reactivation yet)
- **Goals**: Prove value across personas, refine AI models
- **Success**: 8 min time-to-insight, 48% agent engagement, 60% user satisfaction

### Phase 3: Public Beta (Month 5-7)
- **Scope**: All paid users, all features except Reactivation
- **Features**: Full feature set, AI improvements from beta feedback
- **Goals**: Scale to full user base, drive adoption
- **Success**: 3 min time-to-insight, 35% AI interaction rate

### Phase 4: General Availability (Month 8+)
- **Scope**: All users including free tier, all features
- **Features**: Reactivation Intelligence enabled, white-labeling (enterprise)
- **Goals**: Hit annual targets, demonstrate ROI
- **Success**: 50% AI interaction rate, 60% non-analyst users, 90% query success rate

### Rollback Criteria
- Query success rate <60%
- Agent causes confusion (negative user feedback >30%)
- Performance degradation (p95 latency >10s)
- Data privacy incident

---

## Open Questions & Risks

### Open Questions
1. **Pricing**: Should AI features be premium tier or included in base plan?
2. **Guardrails**: How do we prevent AI from answering questions outside GWI's data domain?
3. **Multimodal**: Should we support image/video inputs (e.g., upload competitor ad for analysis)?
4. **Language Support**: Which languages to prioritize (Spanish, French, German, Japanese)?

### Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI hallucinations (incorrect insights) | High (brand damage, user mistrust) | Medium | Confidence thresholds, citation of sources, human review sample |
| Slow AI response times | Medium (poor UX) | Medium | Caching, streaming responses, GPU scaling, query optimization |
| Low query success rate (<70%) | High (adoption failure) | Medium | Extensive testing, clarifying questions, continuous model improvement |
| User overwhelm (too many suggestions) | Medium (annoyance, feature ignored) | Low | Frequency caps, user controls (snooze, dismiss, disable) |
| Privacy concerns (AI learning from sensitive data) | High (compliance, legal) | Low | Data anonymization, user consent, SOC 2 compliance, opt-out option |

---

## Appendix

### Glossary
- **Natural Language Query (NLQ)**: User asks question in plain English; AI converts to data query
- **Persistent Agent**: Always-on AI assistant embedded in product
- **Cross-Dataset Synthesis**: AI-driven correlation analysis across multiple datasets
- **Reactivation Intelligence**: AI system to identify and re-engage dormant users
- **NL2SQL**: Natural Language to SQL (converting English to database queries)

### References
- [LangChain Agents](https://python.langchain.com/docs/modules/agents/)
- [Text-to-SQL with LLMs](https://arxiv.org/abs/2204.00498)
- [Customer Churn Prediction](https://towardsdatascience.com/churn-prediction-770d6cb582a5)
- [Conversational AI Best Practices](https://www.nngroup.com/articles/chatbots/)

---

**Document History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 2024 | Growth Platform Team | Initial draft |
