import { ChevronRight, Sparkle } from "lucide-react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "../ui/accordion";
import { } from "@radix-ui/react-accordion";




const faqsList = [
    { question: "How does Pictoria AI work?", answer: "Pictoria AI uses advanced machine learning algorithms to analyze and understand your photos. It then generates new images based on your features and the scenarios you choose, creating realistic and personalized results." },
    { question: "Is my data safe with Pictoria AI?", answer: "Yes, we take data privacy very seriously. All uploaded photos and generated images are encrypted and stored securely. We never share your personal data or images with third parties without your explicit consent." },
    { question: "How many photos do I need to upload for best results?", answer: "For optimal results, we recommend uploading at least 10-20 diverse photos of yourself. This helps our AI model better understand your features and expressions, leading to more accurate and realistic generated images." },
    { question: "Can I use Pictoria AI for commercial purposes?", answer: "Yes, our Pro and Enterprise plans include commercial usage rights for the images you generate. However, please note that you should always respect copyright and privacy laws when using AI-generated images." },
    { question: "How often do you update the AI model?", answer: "We continuously work on improving our AI model. Major updates are typically released quarterly, with minor improvements and optimizations happening more frequently. All users benefit from these updates automatically." },
    { question: "What are the differences between the free and paid plans?", answer: "The free plan allows you to generate up to 5 images per day. The Pro plan includes unlimited image generation, higher resolution output, and access to additional features. The Enterprise plan is tailored for businesses and offers custom integrations and dedicated support." },
]

const Question = ({ question, answer }: { question: string, answer: string }) => {
    return <AccordionItem value={question}>
        <AccordionTrigger className="text-left">{question}</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
    </AccordionItem>
}

const Faqs = () => {
    return (
        <section id="faqs" className="w-full  py-32  flex flex-col items-center justify-center overflow-hidden">
            <div className="group bg-background backdrop-blur-0 relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
                <span
                    className={cn(
                        "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                    )}
                    style={{
                        WebkitMask:
                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "destination-out",
                        maskComposite: "exclude",
                    }}
                />
                <Sparkle className="w-4 h-4" strokeWidth={1.5} />
                <hr className="mx-2 h-4 w-px shrink-0 bg-gray-400" />
                <AnimatedGradientText className="text-sm font-medium  ">
                    FAQS
                </AnimatedGradientText>
                <ChevronRight className="ml-1 size-4 stroke-black-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </div>

            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">Frequently Asked Questions</h2>
                    <p className="text-lg mt-4 font-medium text-gray-600 font-pj">Here are some of the most frequently asked questions about our product</p>
                </div>



                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto mt-16">
                    {
                        faqsList.map((faq) => {
                            return <Question key={faq.question} {...faq} />
                        })
                    }
                </Accordion>

            </div>

        </section>
    )
}

export default Faqs;


