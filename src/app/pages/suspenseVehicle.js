import { Suspense, lazy } from 'react';

const SelectorVehicle = lazy(() => import('./selectorVehicle'));

export default function VehicleSelector() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectorVehicle />
    </Suspense>
  );
}
