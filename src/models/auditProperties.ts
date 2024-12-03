/**
 * Interface representing the audit properties for an entity.
 *
 * @property {string} createdAt - The date and time when the entity was created.
 * @property {string} updatedAt - The date and time when the entity was last updated.
 * @property {string} [deletedAt] - The date and time when the entity was deleted, if applicable.
 */
export interface AuditProperties {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
