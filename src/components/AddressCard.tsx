import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Check } from "lucide-react";
import EthLogo from "@/assets/eth-logo.svg";
import SolLogo from "@/assets/sol-logo.svg";

interface Address {
  network: "ethereum" | "solana";
  address: string;
  label: string;
  logo: string;
}

const addresses: Address[] = [
  {
    network: "ethereum",
    address: "0xB9DB8eeDf29F289fE14cFFA72fbE6d01f38259c0",
    label: "Ethereum",
    logo: EthLogo,
  },
  {
    network: "solana",
    address: "DLx6UWBrjQBA23SniBQbobcXNjrMvmyq1v9Zqz5U7xdY",
    label: "Solana",
    logo: SolLogo,
  },
];

export default function AddressCard() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col gap-5">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold text-neutral-200">
            Donate to{" "}
            <a 
              href="https://x.com/icantcodefyi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-neutral-100 transition-colors hover:underline decoration-neutral-600 hover:decoration-neutral-400"
            >
              icantcodefyi
            </a>
          </h2>
          <p className="text-neutral-300 hover:text-neutral-100">0/700$</p>
        </div>
        {addresses.map((addr) => (
          <Card key={addr.network} className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img src={addr.logo} alt={`${addr.label} Logo`} className="w-8 h-8 flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-mono text-neutral-400 break-all">
                      {addr.address}
                    </span>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(addr.address)}
                      className="h-8 w-8 p-0 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 flex-shrink-0"
                    >
                      {copiedAddress === addr.address ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-neutral-800 border-neutral-700 text-neutral-200">
                    <p>{copiedAddress === addr.address ? "Copied!" : "Copy address"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
} 