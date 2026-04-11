import { NextRequest, NextResponse } from 'next/server';
import { resend, ADMIN_EMAIL } from '@/lib/email';
import { OrderNotificationEmail } from '@/emails/order-notification';
import { CustomerConfirmationEmail } from '@/emails/customer-confirmation';
import packMappings from '@/content/packMappings.json';
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, itemName, itemPrice, itemType } = body;
        // Validate required fields
        if (!name || !email || !phone || !itemName || !itemPrice) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }
        // Generate order reference
        const orderReference = `MW-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        // Map itemName to pack slug
        // Default fallback slug
        let packSlug = itemName.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
        // Find pack where displayName or name matches itemName
        const matchedEntry = Object.values(packMappings).find((p: any) => 
            p.displayName === itemName || p.name === itemName
        );
        if (matchedEntry) {
            // Extract slug from various possible fields
            const entry = matchedEntry as any;
            if (entry.folder) {
                packSlug = entry.folder;
            } else if (entry.slug) {
                packSlug = entry.slug;
            } else if (entry.name) {
                // fallback: slugify name
                packSlug = entry.name.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
            }
        }
        const downloadLink = `https://mindwaveja.com/media/${packSlug}.zip`;
        // Send email to admin
        await resend.emails.send({
            from: 'MindWave Jamaica <orders@mindwaveja.com>',
            to: ADMIN_EMAIL,
            subject: `New Order Request - ${itemName}`,
            react: OrderNotificationEmail({
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                itemName,
                itemPrice,
                orderReference,
                packSlug,
            }),
        });
        // Send confirmation email to customer
        await resend.emails.send({
            from: 'MindWave Jamaica <orders@mindwaveja.com>',
            to: email,
            subject: `Order Confirmation - ${itemName}`,
            react: CustomerConfirmationEmail({
                customerName: name,
                itemName,
                itemPrice,
                orderReference,
                downloadLink,
            }),
        });
        return NextResponse.json({
            success: true,
            orderReference,
            downloadLink,
        });
    } catch (error) {
        console.error('Purchase request error:', error);
        return NextResponse.json(
            { error: 'Failed to process order request' },
            { status: 500 }
        );
    }
}