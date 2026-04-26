// Test suite for validating PACE ticket requirements
// This validates that tickets must have proper descriptions and acceptance criteria

import {
  validateTicketDescription,
  validateTicketAcceptanceCriteria,
  validateTicket,
} from '../ticket-validation';

describe('PACE Ticket Validation', () => {
  describe('ENG-6 Task 4 - Empty Ticket Handling', () => {
    it('should require a ticket description', () => {
      const ticket = {
        id: 'ENG-6',
        summary: 'Task 4',
        description: '',
        acceptanceCriteria: [],
      };

      const hasDescription = validateTicketDescription(ticket);
      
      expect(hasDescription).toBe(false);
    });

    it('should require at least one acceptance criterion', () => {
      const ticket = {
        id: 'ENG-6',
        summary: 'Task 4',
        description: 'Some description',
        acceptanceCriteria: [],
      };

      const hasAcceptanceCriteria = validateTicketAcceptanceCriteria(ticket);
      
      expect(hasAcceptanceCriteria).toBe(false);
    });

    it('should validate a complete ticket', () => {
      const ticket = {
        id: 'ENG-6',
        summary: 'Task 4',
        description: 'Implement feature X',
        acceptanceCriteria: ['Feature X should do Y'],
      };

      const isValid = validateTicket(ticket);
      
      expect(isValid).toBe(true);
    });

    it('should reject tickets with empty description', () => {
      const ticket = {
        id: 'ENG-6',
        summary: 'Task 4',
        description: '',
        acceptanceCriteria: ['Some criterion'],
      };

      const isValid = validateTicket(ticket);
      
      expect(isValid).toBe(false);
    });

    it('should reject tickets with whitespace-only description', () => {
      const ticket = {
        id: 'ENG-6',
        summary: 'Task 4',
        description: '   ',
        acceptanceCriteria: ['Some criterion'],
      };

      const isValid = validateTicket(ticket);
      
      expect(isValid).toBe(false);
    });
  });
});
