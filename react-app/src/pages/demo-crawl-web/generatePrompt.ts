
/**
 * MetaPromptConfig - Configuration for creating meta prompts using the 5-layer model
 * 
 * 5-Layer Meta Generation Model:
 * Layer 1 (Role): Define the AI's role/persona
 * Layer 2 (Objective): Main goal to achieve
 * Layer 3 (Context): Background information and context
 * Layer 4 (Constraints): Rules and restrictions
 * Layer 5 (Output): Output format and behavior
 */
type MetaPromptConfig = {
  /**
   * Layer 1 - Role
   * Defines what role the AI should take (expert, assistant, analyzer, etc.)
   * Example: "a professional data analyst", "an expert chart designer"
   * Impact: Establishes the tone and approach the AI will use
   */
  role: string

  /**
   * Layer 2 - Objective
   * Detailed description of the task to be completed
   * Example: "Generate a bar chart from the provided data"
   * Impact: Focuses the AI on a specific outcome
   */
  objective: string

  /**
   * Layer 3 - Context
   * Provides background information, examples, or reference data
   * Can be a string or complex object
   * Example: Sample data, type definitions, best practices
   * Impact: Helps AI understand the context and generate more accurate output
   */
  context?: string | Record<string, unknown>

  /**
   * Layer 3 (continued) - User Input
   * The main content provided by the user
   * Example: "sales data for Q1-Q4", "create a pie chart"
   * Impact: Core data for AI to process
   */
  userInput: string

  /**
   * Layer 4 - Constraints
   * Rules and limitations the AI must follow
   * Example: ["Must include at least 3 data points", "Use only numerical values"]
   * Impact: Ensures output meets requirements and is safe
   */
  constraints?: string[]

  /**
   * Layer 5 - Output Format
   * Exact structure of the result (JSON schema, template, etc.)
   * Example: { type: "BAR_CHART", data: [[]], title: "" }
   * Impact: Ensures output can be parsed and used
   */
  outputFormat: string | Record<string, unknown>

  /**
   * Layer 5 (continued) - Behavior Rules
   * Guidelines for how AI should respond and handle edge cases
   * Example: ["Return plain JSON only", "No code fences", "Handle missing data gracefully"]
   * Impact: Controls quality and consistency of output
   */
  behaviorRules?: string[]
}

export function generateMetaPrompt(config: MetaPromptConfig): string {
  const { role, objective, context, userInput, constraints = [], outputFormat, behaviorRules = [] } = config

  const parts = [`I want you to act as: ${role}`, `\nObjective:\n${objective}`]

  if (context) {
    const contextStr = typeof context === 'string' ? context : JSON.stringify(context, null, 2)
    parts.push(`\nContext:\n${contextStr}`)
  }

  parts.push(`\nUser Input:\n"${userInput}"`)

  if (constraints.length > 0) {
    const constraintsList = constraints.map((c) => `- ${c}`).join('\n')
    parts.push(`\nConstraints:\n${constraintsList}`)
  }

  const formatStr = typeof outputFormat === 'string' ? outputFormat : JSON.stringify(outputFormat, null, 2)
  parts.push(`\nOutput Format (strict):\n${formatStr}`)

  if (behaviorRules.length > 0) {
    const rulesList = behaviorRules.map((r) => `- ${r}`).join('\n')
    parts.push(`\nBehavior Rules:\n${rulesList}`)
  }

  return parts.join('\n').trim()
}