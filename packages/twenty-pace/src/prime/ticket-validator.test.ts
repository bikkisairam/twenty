import { validateTicket, TicketValidationError } from './ticket-validator';

describe('PRIME Ticket Validator', () => {
  describe('validateTicket', () => {
    it('should throw TicketValidationError when ticket has empty description', () => {
      // Given: A ticket with empty description
      const ticket = {
        id: 'ENG-2',
        description: '',
        acceptanceCriteria: ['Criterion 1'],
      };

      // When: PRIME attempts to validate the ticket
      // Then: It should throw a TicketValidationError
      expect(() => validateTicket(ticket)).toThrow(TicketValidationError);
      expect(() => validateTicket(ticket)).toThrow(
        'Ticket is unactionable: missing description',
      );
    });

    it('should throw TicketValidationError when ticket has no acceptance criteria', () => {
      // Given: A ticket with no acceptance criteria
      const ticket = {
        id: 'ENG-2',
        description: 'Some description',
        acceptanceCriteria: [],
      };

      // When: PRIME attempts to validate the ticket
      // Then: It should throw a TicketValidationError
      expect(() => validateTicket(ticket)).toThrow(TicketValidationError);
      expect(() => validateTicket(ticket)).toThrow(
        'Ticket is unactionable: missing acceptance criteria',
      );
    });

    it('should throw TicketValidationError when ticket has undefined description', () => {
      // Given: A ticket with undefined description
      const ticket = {
        id: 'ENG-2',
        acceptanceCriteria: ['Criterion 1'],
      };

      // When: PRIME attempts to validate the ticket
      // Then: It should throw a TicketValidationError
      expect(() => validateTicket(ticket as any)).toThrow(
        TicketValidationError,
      );
      expect(() => validateTicket(ticket as any)).toThrow(
        'Ticket is unactionable: missing description',
      );
    });

    it('should throw TicketValidationError when ticket has undefined acceptance criteria', () => {
      // Given: A ticket with undefined acceptance criteria
      const ticket = {
        id: 'ENG-2',
        description: 'Some description',
      };

      // When: PRIME attempts to validate the ticket
      // Then: It should throw a TicketValidationError
      expect(() => validateTicket(ticket as any)).toThrow(
        TicketValidationError,
      );
      expect(() => validateTicket(ticket as any)).toThrow(
        'Ticket is unactionable: missing acceptance criteria',
      );
    });

    it('should throw TicketValidationError when ticket has both missing description and acceptance criteria', () => {
      // Given: A ticket with both empty description and no acceptance criteria
      const ticket = {
        id: 'ENG-2',
        description: '',
        acceptanceCriteria: [],
      };

      // When: PRIME attempts to validate the ticket
      // Then: It should throw a TicketValidationError mentioning both issues
      expect(() => validateTicket(ticket)).toThrow(TicketValidationError);
      const error = () => validateTicket(ticket);
      expect(error).toThrow(/missing description/);
      expect(error).toThrow(/missing acceptance criteria/);
    });

    it('should not throw when ticket has valid description and at least one acceptance criterion', () => {
      // Given: A valid ticket with description and acceptance criteria
      const ticket = {
        id: 'ENG-1',
        description: 'Build a new feature',
        acceptanceCriteria: [
          'Feature should do X',
          'Feature should handle Y',
        ],
      };

      // When: PRIME attempts to validate the ticket
      // Then: It should not throw an error
      expect(() => validateTicket(ticket)).not.toThrow();
    });

    it('should not throw when ticket has whitespace-only description treated as empty', () => {
      // Given: A ticket with whitespace-only description
      const ticket = {
        id: 'ENG-2',
        description: '   \n\t  ',
        acceptanceCriteria: ['Criterion 1'],
      };

      // When: PRIME attempts to validate the ticket
      // Then: It should throw a TicketValidationError
      expect(() => validateTicket(ticket)).toThrow(TicketValidationError);
      expect(() => validateTicket(ticket)).toThrow(
        'Ticket is unactionable: missing description',
      );
    });
  });
});
