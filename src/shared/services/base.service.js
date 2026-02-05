import httpInstance from './http.instance';

/**
 * Abstract base service class providing common CRUD operations for REST API endpoints.
 * @template T The type of resource this service manages
 */
export default class BaseService {
  /**
   * Constructor for the BaseService
   * @param {string} resourceEndpoint - Endpoint path for the specific resource
   */
  constructor(resourceEndpoint) {
    /** Endpoint path for the specific resource */
    this.resourceEndpoint = resourceEndpoint;
  }

  /**
   * Handles HTTP errors and logs them to the console
   * @param {Error} error - The HTTP error response
   * @throws {Error} Throws an error with a user-friendly message
   */
  handleError(error) {
    console.error('An error occurred:', error);
    throw new Error('Something bad happened; please try again later.');
  }

  /**
   * Constructs the full resource URL path
   * @returns {string} The complete URL for the resource endpoint
   */
  resourcePath() {
    return `${this.resourceEndpoint}`;
  }

  /**
   * Creates a new resource
   * @param {T} resource - The resource to create
   * @returns {Promise<T>} A Promise that resolves to the created resource
   */
  async create(resource) {
    try {
      const response = await httpInstance.post(this.resourcePath(), resource);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Deletes a resource by ID
   * @param {any} id - The ID of the resource to delete
   * @returns {Promise<void>} A Promise that resolves when the resource is deleted
   */
  async delete(id) {
    try {
      await httpInstance.delete(`${this.resourcePath()}/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Updates an existing resource
   * @param {any} id - The ID of the resource to update
   * @param {T} resource - The updated resource data
   * @returns {Promise<T>} A Promise that resolves to the updated resource
   */
  async update(id, resource) {
    try {
      const response = await httpInstance.put(`${this.resourcePath()}/${id}`, resource);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Retrieves all resources
   * @returns {Promise<Array<T>>} A Promise that resolves to an array of all resources
   */
  async getAll() {
    try {
      const response = await httpInstance.get(this.resourcePath());
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Retrieves a resource by ID
   * @param {any} id - The ID of the resource to retrieve
   * @returns {Promise<T>} A Promise that resolves to the requested resource
   */
  async getById(id) {
    try {
      const response = await httpInstance.get(`${this.resourcePath()}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
