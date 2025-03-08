import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const RangeSlider = () => {
  const [value, setValue] = useState([50]); // Default value

  return (
    <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Select Weeks</h2>
      <Slider
        defaultValue={value}
        max={26}
        step={2}
        className="w-full"
        onValueChange={(val) => setValue(val)}
      />
      <div className="mt-2 text-center text-xl font-bold">{value[0]}</div>
    </div>
  );
};

export default RangeSlider;
