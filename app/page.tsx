import { TableBuilder } from '@/components/table-builder';
import { ERDBuilder } from '@/components/erd-builder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Database Schema Designer</h1>
      <Tabs defaultValue="erd" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="erd">ERD Builder</TabsTrigger>
          <TabsTrigger value="table">Table Builder</TabsTrigger>
        </TabsList>
        <TabsContent value="erd" className="h-[800px]">
          <ERDBuilder />
        </TabsContent>
        <TabsContent value="table">
          <TableBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
}