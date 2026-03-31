import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";

export default function Contact() {
    return (
        <section className="min-h-[80vh] md:min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
            <h1 className="text-2xl md:text-4xl font-bold mt-5">Get in Touch with Rydex</h1>

            <div className="w-full max-w-md mt-10 bg-[#1E2127] rounded-lg shadow-lg p-6">
                <FieldSet className="">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full name</FieldLabel>
                            <Input id="name" autoComplete="off" placeholder="Jon Doe"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" autoComplete="off" type="email" placeholder="example@gmail.com" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="phonenumber">Phone number</FieldLabel>
                            <Input id="phonenumber" autoComplete="off" type="tel" placeholder="(123) 456-7890" />
                        </Field>
                        <Field className="w-full max-w-3xs">
                            <FieldLabel htmlFor="type">Type of message</FieldLabel>
                            <Select>
                                <SelectTrigger className="w-20">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent className="dark">
                                    <SelectGroup>
                                        <SelectItem value="general">General Inquiry</SelectItem>
                                        <SelectItem value="support">Support</SelectItem>
                                        <SelectItem value="feedback">Feedback</SelectItem>
                                        <SelectItem value="partnership">Partnership</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field orientation="horizontal">
                            <Textarea id="message" placeholder="Your message here..." className="w-full h-30 max-h-50"/>
                        </Field>
                        <Field >
                            <Button className="dark cursor-pointer">Submit</Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </div>
        </section>
    );
}