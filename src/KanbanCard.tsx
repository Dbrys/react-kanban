import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

function KanbanCard() {
  return (
    <Card className="w-80 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Test</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default KanbanCard;
