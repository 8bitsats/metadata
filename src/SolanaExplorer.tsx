import React, { useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Search } from 'lucide-react';

const HELIUS_RPC_URL = "https://mainnet.helius-rpc.com/?api-key=1771237b-e3a5-49cb-b190-af95b2113788";

const SolanaExplorer: React.FC = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    setError(null);
    setBalance(null);

    try {
      const connection = new Connection(HELIUS_RPC_URL, 'confirmed');
      const publicKey = new PublicKey(address);
      const balanceInLamports = await connection.getBalance(publicKey);
      setBalance(balanceInLamports / LAMPORTS_PER_SOL);
    } catch (err) {
      setError('Error fetching balance. Please check the address and try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="bg-gray-800 border-purple-500 rounded-md p-4">
      <h2 className="text-xl font-semibold mb-4 text-green-400">Solana Explorer</h2>
      <div className="flex space-x-2 mb-4">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Solana address"
          className="flex-1 bg-gray-700 text-white border-purple-500 focus:border-green-400 rounded-md p-2"
        />
        <button onClick={fetchBalance} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
          <Search className="inline-block mr-2 h-4 w-4" /> Fetch Balance
        </button>
      </div>
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}
      {balance !== null && (
        <div className="text-green-400">
          Balance: {balance.toFixed(9)} SOL
        </div>
      )}
    </div>
  );
};

export default SolanaExplorer;