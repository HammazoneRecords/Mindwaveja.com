// Umami Analytics Helper Functions

declare global {
    interface Window {
        umami?: {
            track: (eventName: string, eventData?: Record<string, any>) => void;
        };
    }
}

/**
 * Track a custom event in Umami
 * @param eventName - Name of the event (e.g., 'purchase_click', 'pack_view')
 * @param eventData - Optional additional data to track with the event
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.umami) {
        window.umami.track(eventName, eventData);
    }
}

/**
 * Track a purchase button click
 */
export function trackPurchaseClick(itemName: string, itemType: 'pack' | 'product') {
    trackEvent('purchase_click', {
        item_name: itemName,
        item_type: itemType,
    });
}

/**
 * Track a pack view
 */
export function trackPackView(packName: string) {
    trackEvent('pack_view', {
        pack_name: packName,
    });
}

/**
 * Track a product view
 */
export function trackProductView(productName: string) {
    trackEvent('product_view', {
        product_name: productName,
    });
}
