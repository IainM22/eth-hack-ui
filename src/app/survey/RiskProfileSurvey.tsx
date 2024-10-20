"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Checkbox } from "~/components/ui/checkbox";
import { addToLocalStorage, LOCAL_STORAGE_KEYS } from "../utils/storage";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  investmentChoice: z.enum(["a", "b", "c"]),
  returnPreference: z.enum(["a", "b", "c", "d"]),
  riskTakerDescription: z.enum(["a", "b", "c", "d"]),
  age: z.number().min(18).max(120),
  annualIncome: z.number().min(0),
  retirementAge: z.number().min(18).max(120),
  netWorth: z.number().min(0),
  investmentOptions: z.array(z.enum(["stocks", "governmentBonds"])),
});

export function RiskProfileSurvey() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentChoice: undefined,
      returnPreference: undefined,
      riskTakerDescription: undefined,
      age: undefined,
      annualIncome: undefined,
      retirementAge: undefined,
      netWorth: undefined,
      investmentOptions: [],
    },
  });

  const calculateRiskScore = (answers: z.infer<typeof formSchema>) => {
    // TODO: implement
    console.log(answers);
    return 2;
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const riskScore = calculateRiskScore(values);
    addToLocalStorage(LOCAL_STORAGE_KEYS.RISK_SCORE, riskScore);
    router.push("/signup");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <h1 className="mb-12 mt-8 px-4 text-center text-3xl md:text-4xl lg:text-5xl">
        <b>
          <i>Risk Quiz:</i>
        </b>
        <br />
        Help us understand your investment mindset
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="investmentChoice"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-[28px] font-bold">
                  If you had to invest $20,000, which of the following
                  investment choices would you find most appealing?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="a" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        60% in low-risk investments, 30% in medium-risk
                        investments, 10% in high-risk investments
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="b" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        30% in low-risk investments, 40% in medium-risk
                        investments, 30% in high-risk investments
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="c" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        10% in low-risk investments, 40% in medium-risk
                        investments, 50% in high-risk investments
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="returnPreference"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-[28px] font-bold">
                  Given the best and worst case returns of the four investment
                  choices below, which would you prefer?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="a" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        $200 gain best case; $0 gain/loss worst case
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="b" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        $800 gain best case; $200 loss worst case
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="c" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        $2,600 gain best case; $800 loss worst case
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="d" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        $4,800 gain best case; $2,400 loss worst case
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="riskTakerDescription"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-[28px] font-bold">
                  In general, how would your best friend describe you as a risk
                  taker?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="a" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        A real gambler
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="b" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Willing to take risks after completing adequate research
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="c" />
                      </FormControl>
                      <FormLabel className="font-normal">Cautious</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="d" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        A real risk avoider
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="investmentOptions"
            render={() => (
              <FormItem>
                <FormLabel className="text-[28px] font-bold">
                  What investment options do you have access to?
                </FormLabel>
                <FormDescription>Select all that apply.</FormDescription>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="investmentOptions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes("stocks")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, "stocks"])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== "stocks",
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Stocks</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="investmentOptions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes("governmentBonds")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    "governmentBonds",
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== "governmentBonds",
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Government Bonds
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[28px] font-bold">
                  What is your current age?
                </FormLabel>
                <FormControl>
                  <Input className="bg-white"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="annualIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[28px] font-bold">
                  What is your annual income?
                </FormLabel>
                <FormControl>
                  <Input className="bg-white"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="retirementAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[28px] font-bold">
                  What age would you like to retire?
                </FormLabel>
                <FormControl>
                  <Input className="bg-white"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="netWorth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[28px] font-bold">
                  What is your current net worth?
                </FormLabel>
                <FormControl>
                  <Input className="bg-white"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
