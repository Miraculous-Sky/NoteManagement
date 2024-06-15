import { formatDistanceToNow } from "date-fns";

/**
 * Formats the date to a Facebook-like time duration.
 *
 * @param {Date} date
 * @returns {string} - Formatted time duration
 */
export const formatTimeDuration = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};
