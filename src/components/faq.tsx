import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const faqData = [
    {
        question: "What is Rydex's cancellation policy?",
        answer: "We offer free cancellation up to 24 hours before your scheduled pickup time. Cancellations made within 24 hours of pickup may be subject to a fee.",
        value: "cancel"
    },
    {
        question: "How do I modify my reservation?",
        answer: "You can modify your reservation by logging into your account and selecting the reservation you wish to change. From there, you can update your pickup time, return time, or vehicle selection.",
        value: "modify"
    },
    {
        question: "What should I do if I have an issue with my rental car?",
        answer: "If you encounter any issues with your rental car, please contact our customer support team immediately. We are available 24/7 to assist you and will work to resolve any problems as quickly as possible.",
        value: "issue"
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, debit cards, and PayPal. For corporate reservations, we also accept company checks and wire transfers.",
        value: "payment"
    },
    {
        question: "Do you offer any discounts?",
        answer: "Yes, we offer various discounts for long-term rentals, corporate accounts, and seasonal promotions. Please contact our sales team for more information.",
        value: "discount"

    },
    {
        question: "What is your refund policy?",
        answer: "Refunds are processed according to our cancellation policy. Please refer to the terms and conditions for more details.",
        value: "refund"
    },
    {
        question: "How do i reset my password?",
        answer: "To reset your password, please click on the 'Forgot Password' link on the login page and follow the instructions provided.",
        value: "password"
    }
]

const rankFaqData = [
    {
        question: "How does the rank system work?",
        answer: "Our rank system is based on your rental history and customer feedback. The more you rent and the better your feedback, the higher your rank. Higher ranks come with benefits such as discounts and priority support.",
        value: "rank"
    },
    {
        question: "How can I improve my rank?",
        answer: "You can improve your rank by renting more frequently and providing positive feedback after each rental. Additionally, maintaining a good rental history without any issues will also help boost your rank.",
        value: "improveRank"
    },
    {
        question: "What are the benefits of having a higher rank?",
        answer: "Higher ranks come with various benefits, including exclusive discounts, early access to promotions, priority customer support, and invitations to special events.",
        value: "rankBenefits"
    },
    {
        question: "Is there a way to check my current rank?",
        answer: "Yes, you can check your current rank by logging into your account and navigating to the 'My Profile' section. Your rank will be displayed along with your rental history and feedback.",
        value: "checkRank"
    },
    {
        question: "What happens if I have a negative rental experience?",
        answer: "If you have a negative rental experience, please contact our customer support team immediately. We will work to resolve the issue and ensure that it does not negatively impact your rank. We value our customers and strive to provide the best service possible.",
        value: "negativeExperience"
    },
    {
        question: "Can I lose my rank?",
        answer: "While it's possible to lose rank due to negative feedback or a poor rental history, we encourage our customers to maintain a positive experience with us. If you have any concerns about your rank, please reach out to our customer support team for assistance.",
        value: "loseRank"
    }
]

export default function FAQ() {
    return (
        <div className="flex flex-col w-full items-center p-6" id="faq">
            <h1 className="text-4xl font-semibold">FAQs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 ">
                <Card className="w-full max-w-sm max-w-sm bg-[#0f172a] border-none shadow-2xl shadow-[#1d4f52] text-white text-xl">
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription className="text-[#b0b0b0]">Find answers to common questions about our car rental service.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion
                        type="single"
                        collapsible
                        >
                            {faqData.map((item) => (
                                <AccordionItem key={item.value} value={item.value}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="w-full max-w-sm bg-[#0f172a] border-none shadow-2xl shadow-[#1d4f52] text-white text-xl">
                    <CardHeader>
                        <CardTitle>About Rank System</CardTitle>
                        <CardDescription className="text-[#b0b0b0]">Find answers to common questions about our rank system.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion
                        type="single"
                        collapsible>
                            {rankFaqData.map((item) => (
                                <AccordionItem key={item.value} value={item.value}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}