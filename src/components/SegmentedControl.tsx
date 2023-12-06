import React from 'react';
import './SegmentedControl.css'

// Define the props for the component, if any
type SegmentedControlProps = {
  selectedView: 'Week' | 'Day',
  setSelectedView: (view: 'Week' | 'Day') => void
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({selectedView, setSelectedView}) => {

  return (
    <div className='btn-group m-3'>
      <button
        className={selectedView === 'Week' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
        onClick={() => setSelectedView('Week')}
      >
        Week
      </button>
      <button
       className={selectedView === 'Day' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
        onClick={() => setSelectedView('Day')}
      >
        Day
      </button>
    </div>
  );
};

export default SegmentedControl;
