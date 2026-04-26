export interface Ticket {
  id: string;
  description?: string;
  acceptanceCriteria?: string[];
}

export class TicketValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TicketValidationError';
  }
}

export function validateTicket(ticket: Ticket): void {
  const errors: string[] = [];

  // Check if description is missing or empty (including whitespace-only)
  if (!ticket.description || ticket.description.trim() === '') {
    errors.push('missing description');
  }

  // Check if acceptance criteria is missing or empty
  if (!ticket.acceptanceCriteria || ticket.acceptanceCriteria.length === 0) {
    errors.push('missing acceptance criteria');
  }

  // If there are any validation errors, throw
  if (errors.length > 0) {
    throw new TicketValidationError(
      `Ticket is unactionable: ${errors.join(', ')}`,
    );
  }
}
