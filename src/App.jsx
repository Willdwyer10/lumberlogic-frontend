import React, { useState } from 'react';
import { Plus, Trash2, Calculator, Package, Scissors } from 'lucide-react';

export default function LumberLogic() {
  const [cuts, setCuts] = useState([
    { width: 2, height: 4, length: 24, quantity: 3 }
  ]);
  const [boards, setBoards] = useState([
    { width: 2, height: 4, length: 96, price: 8 }
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addCut = () => {
    setCuts([...cuts, { width: 2, height: 4, length: 12, quantity: 1 }]);
  };

  const removeCut = (index) => {
    setCuts(cuts.filter((_, i) => i !== index));
  };

  const updateCut = (index, field, value) => {
    const newCuts = [...cuts];
    newCuts[index][field] = field === 'quantity' ? parseInt(value) || 0 : parseFloat(value) || 0;
    setCuts(newCuts);
  };

  const addBoard = () => {
    setBoards([...boards, { width: 2, height: 4, length: 96, price: 8 }]);
  };

  const removeBoard = (index) => {
    setBoards(boards.filter((_, i) => i !== index));
  };

  const updateBoard = (index, field, value) => {
    const newBoards = [...boards];
    newBoards[index][field] = parseFloat(value) || 0;
    setBoards(newBoards);
  };

  const optimize = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://lumberlogic-backend.onrender.com/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cuts, boards })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Optimization failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-3">
            <Scissors className="w-10 h-10" />
            LumberLogic
          </h1>
          <p className="text-amber-700">Optimize your lumber cuts and minimize waste</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Cuts Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Scissors className="w-5 h-5" />
                Required Cuts
              </h2>
              <button
                onClick={addCut}
                className="flex items-center gap-1 px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Cut
              </button>
            </div>

            <div className="space-y-3">
              {cuts.map((cut, index) => (
                <div key={index} className="flex gap-2 items-center p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Width</label>
                      <input
                        type="number"
                        value={cut.width}
                        onChange={(e) => updateCut(index, 'width', e.target.value)}
                        placeholder="W"
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Height</label>
                      <input
                        type="number"
                        value={cut.height}
                        onChange={(e) => updateCut(index, 'height', e.target.value)}
                        placeholder="H"
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Length</label>
                      <input
                        type="number"
                        value={cut.length}
                        onChange={(e) => updateCut(index, 'length', e.target.value)}
                        placeholder="Length"
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Quantity</label>
                      <input
                        type="number"
                        value={cut.quantity}
                        onChange={(e) => updateCut(index, 'quantity', e.target.value)}
                        placeholder="Qty"
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeCut(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded mt-5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              All measurements in inches
            </div>
          </div>

          {/* Boards Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Available Boards
              </h2>
              <button
                onClick={addBoard}
                className="flex items-center gap-1 px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Board
              </button>
            </div>

            <div className="space-y-3">
              {boards.map((board, index) => (
                <div key={index} className="flex gap-2 items-center p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Width</label>
                      <input
                        type="number"
                        value={board.width}
                        onChange={(e) => updateBoard(index, 'width', e.target.value)}
                        placeholder="W"
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Height</label>
                      <input
                        type="number"
                        value={board.height}
                        onChange={(e) => updateBoard(index, 'height', e.target.value)}
                        placeholder="H"
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Length</label>
                      <input
                        type="number"
                        value={board.length}
                        onChange={(e) => updateBoard(index, 'length', e.target.value)}
                        placeholder="Length"
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={board.price}
                        onChange={(e) => updateBoard(index, 'price', e.target.value)}
                        placeholder="Price"
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeBoard(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded mt-5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              All measurements in inches
            </div>
          </div>
        </div>

        {/* Optimize Button */}
        <div className="text-center mb-6">
          <button
            onClick={optimize}
            disabled={loading || cuts.length === 0 || boards.length === 0}
            className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg flex items-center gap-2 mx-auto"
          >
            <Calculator className="w-5 h-5" />
            {loading ? 'Optimizing...' : 'Optimize Cuts'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-semibold">Error:</p>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Optimization Results</h2>

            {/* Shopping List */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                Shopping List
              </h3>
              <div className="space-y-2">
                {Object.entries(result.board_plan).map(([boardIdx, quantity]) => {
                  const board = boards[parseInt(boardIdx)];
                  return (
                    <div key={boardIdx} className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">
                        Buy {quantity}× {board.width}×{board.height}×{board.length}" boards
                      </span>
                      <span className="text-green-700 font-semibold">
                        ${(board.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-right">
                <span className="text-2xl font-bold text-green-700">
                  Total Cost: ${result.total_cost.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Cutting Instructions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                Cutting Instructions
              </h3>
              <div className="space-y-4">
                {Object.entries(result.cut_plan).map(([boardIdx, boardsList]) => {
                  const board = boards[parseInt(boardIdx)];
                  return (
                    <div key={boardIdx}>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {board.width}×{board.height}×{board.length}" Boards:
                      </h4>
                      <div className="space-y-2 ml-4">
                        {boardsList.map((cutsOnBoard, i) => {
                          const waste = board.length - cutsOnBoard.reduce((a, b) => a + b, 0);
                          return (
                            <div key={i} className="p-2 bg-blue-50 rounded text-sm">
                              <span className="font-medium">Board #{i + 1}:</span>{' '}
                              {cutsOnBoard.map(c => `${c}"`).join(' + ')} = {cutsOnBoard.reduce((a, b) => a + b, 0)}"
                              <span className="text-gray-600 ml-2">(waste: {waste}")</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Waste Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                Waste Summary
              </h3>
              <div className="space-y-2">
                {Object.entries(result.waste_summary).map(([boardIdx, waste]) => {
                  const board = boards[parseInt(boardIdx)];
                  return (
                    <div key={boardIdx} className="flex justify-between p-2 bg-gray-50 rounded text-sm">
                      <span>{board.width}×{board.height}×{board.length}"</span>
                      <span className="font-medium">{waste}" total waste</span>
                    </div>
                  );
                })}
                <div className="flex justify-between p-3 bg-amber-100 rounded font-semibold mt-2">
                  <span>Total Waste:</span>
                  <span>{Object.values(result.waste_summary).reduce((a, b) => a + b, 0)}"</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}