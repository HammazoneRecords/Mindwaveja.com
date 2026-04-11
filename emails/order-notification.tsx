import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface OrderNotificationEmailProps {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    itemName: string;
    itemPrice: string;
    orderReference: string;
    packSlug: string;
}

export const OrderNotificationEmail = ({
    customerName,
    customerEmail,
    customerPhone,
    itemName,
    itemPrice,
    orderReference,
    packSlug,
}: OrderNotificationEmailProps) => (
    <Html>
        <Head />
        <Preview>New Order Request - {itemName}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>🎉 New Order Request</Heading>

                <Section style={section}>
                    <Text style={text}>
                        <strong>Order Reference:</strong> {orderReference}
                    </Text>
                    <Text style={text}>
                        <strong>Item:</strong> {itemName}
                    </Text>
                    <Text style={text}>
                        <strong>Price:</strong> {itemPrice}
                    </Text>
                </Section>

                <Section style={section}>
                    <Heading style={h2}>Customer Details</Heading>
                    <Text style={text}>
                        <strong>Name:</strong> {customerName}
                    </Text>
                    <Text style={text}>
                        <strong>Email:</strong> {customerEmail}
                    </Text>
                    <Text style={text}>
                        <strong>Phone:</strong> {customerPhone}
                    </Text>
                </Section>

                <Section style={section}>
                    <Heading style={h2}>Pack Details</Heading>
                    <Text style={text}>
                        <strong>Pack Slug:</strong> {packSlug}
                    </Text>
                    <Text style={text}>
                        <strong>Download Link:</strong> https://mindwaveja.com/media/{packSlug}.zip
                    </Text>
                </Section>

                <Section style={section}>
                    <Text style={text}>
                        The customer has been sent bank transfer instructions. Please check your bank account for the transfer and confirm the order once received.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default OrderNotificationEmail;

const main = {
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
};

const section = {
    padding: '0 48px',
    marginBottom: '24px',
};

const h1 = {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0 48px',
};

const h2 = {
    color: '#1a1a1a',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '16px 0',
};

const text = {
    color: '#525252',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '8px 0',
};
