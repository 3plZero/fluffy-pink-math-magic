
import SimpleCalculator from "@/components/SimpleCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            ✨ Simple Calculator ✨
          </h1>
          <p className="text-pink-600 text-sm opacity-80">Clean & simple math</p>
        </div>
        <SimpleCalculator />
      </div>
    </div>
  );
};

export default Index;
