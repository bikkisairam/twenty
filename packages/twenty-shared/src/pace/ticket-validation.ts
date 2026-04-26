// PACE ticket validation utilities
// Ensures tickets have proper descriptions and acceptance criteria before implementation

export type Ticket = {
  id: string;
  summary: string;
  description: string;
  acceptanceCriteria: string[];
};

/**
 * Validates that a ticket has a non-empty description
 */
export function validateTicketDescription(ticket: { description: string }): boolean {
  return ticket.description.trim().length > 0;
}

/**
 * Validates that a ticket has at least one acceptance criterion
 */
export function validateTicketAcceptanceCriteria(ticket: { acceptanceCriteria: string[] }): boolean {
  return ticket.acceptanceCriteria.length > 0;
}

/**
 * Validates that a ticket has both description and acceptance criteria
 */
export function validateTicket(ticket: { description: string; acceptanceCriteria: string[] }): boolean {
  return validateTicketDescription(ticket) && validateTicketAcceptanceCriteria(ticket);
}
