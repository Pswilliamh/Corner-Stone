'use client';

import type { IdentifyRockOutput } from '@/ai/flows/identify-rock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Info, BarChart3, MapPin, Lightbulb, Gem } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface RockIdentificationDisplayProps {
  rockData: IdentifyRockOutput;
}

const DetailItem: React.FC<{ label: string; value: string | number | undefined; unit?: string }> = ({ label, value, unit }) => {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="grid grid-cols-2 gap-2 py-2 border-b border-border/50 last:border-b-0">
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}{unit ? ` ${unit}` : ''}</dd>
    </div>
  );
};

const RockIdentificationDisplay: React.FC<RockIdentificationDisplayProps> = ({ rockData }) => {
  const { identification, physicalProperties, formationProcess, commonLocations, collectingValue, funFacts } = rockData;

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="bg-card rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-3xl font-bold text-primary">
          <Gem className="h-10 w-10 text-accent" />
          {identification.commonName}
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground italic">
          {identification.scientificName}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Card className="bg-background/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-secondary">
              <CheckCircle className="h-6 w-6" />
              Identification Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DetailItem label="Primary ID" value={identification.primaryIdentification} />
            <DetailItem label="Classification" value={identification.classification} />
            <DetailItem label="Family" value={identification.family} />
            <div>
              <p className="font-medium text-muted-foreground mb-1">Confidence Level</p>
              <div className="flex items-center gap-2">
                <Progress value={identification.confidenceLevel * 100} className="w-full h-3 [&>div]:bg-accent" />
                <span className="text-sm font-semibold text-accent">
                  {(identification.confidenceLevel * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="physical-properties" className="border border-border rounded-lg shadow-sm">
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold hover:bg-muted/50 rounded-t-lg data-[state=open]:bg-muted/50 data-[state=open]:rounded-b-none">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-secondary" /> Physical Properties
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-4">
              <dl className="divide-y divide-border/50">
                <DetailItem label="Hardness (Mohs)" value={physicalProperties.hardness} />
                <DetailItem label="Luster" value={physicalProperties.luster} />
                <DetailItem label="Color Range" value={physicalProperties.colorRange} />
                <DetailItem label="Streak Color" value={physicalProperties.streakColor} />
                <DetailItem label="Cleavage/Fracture" value={physicalProperties.cleavageFracture} />
                <DetailItem label="Crystal Structure" value={physicalProperties.crystalStructure} />
              </dl>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="formation" className="border border-border rounded-lg shadow-sm">
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold hover:bg-muted/50 rounded-t-lg data-[state=open]:bg-muted/50 data-[state=open]:rounded-b-none">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-secondary" /> Formation Process
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-4 text-foreground/90 leading-relaxed">
              {formationProcess}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="locations" className="border border-border rounded-lg shadow-sm">
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold hover:bg-muted/50 rounded-t-lg data-[state=open]:bg-muted/50 data-[state=open]:rounded-b-none">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" /> Common Locations
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-4 text-foreground/90 leading-relaxed">
              {commonLocations}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="value" className="border border-border rounded-lg shadow-sm">
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold hover:bg-muted/50 rounded-t-lg data-[state=open]:bg-muted/50 data-[state=open]:rounded-b-none">
              <div className="flex items-center gap-2">
                 <Gem className="h-5 w-5 text-secondary" /> Collecting Value
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-4 text-foreground/90 leading-relaxed">
              {collectingValue}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fun-facts" className="border border-border rounded-lg shadow-sm">
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold hover:bg-muted/50 rounded-t-lg data-[state=open]:bg-muted/50 data-[state=open]:rounded-b-none">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-secondary" /> Fun Facts
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-0 pb-4 text-foreground/90 leading-relaxed">
              {funFacts}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default RockIdentificationDisplay;
