export interface WarehouseSettings {
  shelfHeight: number;
  firstShelfHeight: number;
  numberOfShifts: number;
}

export interface RobotStatus {
  status: 'idle' | 'moving' | 'picking' | 'error';
  battery: number;
  currentPosition: Position;
  currentTask?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  location: string;
  lastUpdated: string;
}

export interface OrderTask {
  id: string;
  items: InventoryItem[];
  status: 'pending' | 'in-progress' | 'completed';
  assignedRobot?: string;
  startTime?: string;
  completionTime?: string;
}