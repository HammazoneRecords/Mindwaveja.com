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

interface CustomerConfirmationEmailProps {
    customerName: string;
    itemName: string;
    itemPrice: string;
    orderReference: string;
    downloadLink: string;}

export const CustomerConfirmationEmail = ({
    customerName,
    itemName,
    itemPrice,
    orderReference,
    downloadLink,
}: CustomerConfirmationEmailProps) => (
    <Html>
        <Head />
        <Preview>Order Confirmation - {itemName}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Thank You for Your Order! 🙏</Heading>

                <Section style={section}>
                    <Text style={text}>Hi {customerName},</Text>
                    <Text style={text}>
                        Thank you for your interest in <strong>{itemName}</strong>. We've received your order request!
                    </Text>
                </Section>

                <Section style={section}>
                    <Heading style={h2}>Order Details</Heading>
                    <Text style={text}>
                        <strong>Order Reference:</strong> {orderReference}
                    </Text>
                    <Text style={text}>
                        <strong>Item:</strong> {itemName}
                    </Text>
                    <Text style={text}>
                        <strong>Amount:</strong> {itemPrice}
                    </Text>
                </Section>

                <Section style={section}>
                    <Heading style={h2}>Next Steps - Bank Transfer</Heading>
                    <Text style={text}>
                        Please complete your payment via bank transfer to:
                    </Text>
                    <Text style={bankDetails}>
                        <strong>Bank:</strong> Scotiabank Jamaica<br />
                        <strong>Account Name:</strong> MindWave Jamaica<br />
                        <strong>Account Number:</strong> [TO BE PROVIDED]<br />
                        <strong>Branch:</strong> Kingston<br />
                        <strong>Reference:</strong> {orderReference}
                    </Text>
                    <Text style={text}>
                        <strong>Important:</strong> Please use <strong>{orderReference}</strong> as your transfer reference so we can match your payment.
                    </Text>
                </Section>

                <Section style={section}>
                    <Heading style={h2}>Your Pack is Ready! 📦</Heading>
                    <Text style={text}>
                        Your Phase Pack deliverables are available for immediate download.
                        The zip file contains all the templates, checklists, and resources mentioned in the pack.
                    </Text>
                    <Text style={text}>
                        <strong>Download Link:</strong> <a href={downloadLink} style={linkStyle}>{downloadLink}</a>
                    </Text>
                    <Text style={text}>
                        <strong>Note:</strong> This link will remain active. If you have any issues downloading, reply to this email.
                    </Text>
                </Section>

                <Section style={section}>
                    <Text style={text}>
                        Once we confirm your payment, we'll send you access to your purchase within 24 hours.
                    </Text>
                    <Text style={text}>
                        Questions? Reply to this email or WhatsApp us at [TO BE PROVIDED].
                    </Text>
                </Section>

                <Section style={section}>
                    <Text style={footer}>
                        MindWave Jamaica<br />
                        Ideas to Income. Guidance to Growth.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default CustomerConfirmationEmail;

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

const bankDetails = {
    backgroundColor: '#f9f9f9',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    color: '#1a1a1a',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '16px 0',
};

const linkStyle = {
    color: '#0070f3',
    textDecoration: 'underline',
};
const footer = {
    color: '#8a8a8a',
    fontSize: '14px',
    lineHeight: '20px',
    marginTop: '32px',
};
