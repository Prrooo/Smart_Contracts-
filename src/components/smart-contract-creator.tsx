"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

interface SmartContract {
  id: number;
  title: string;
  description: string;
  reward: number;
  fulfilled: boolean;
}

export function SmartContractCreatorComponent() {
  const [contracts, setContracts] = useState<SmartContract[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [reward, setReward] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newContract: SmartContract = {
      id: Date.now(),
      title,
      description,
      reward: parseFloat(reward),
      fulfilled: false,
    }
    setContracts([...contracts, newContract])
    setTitle("")
    setDescription("")
    setReward("")
  }

  const fulfillContract = (id: number) => {
    setContracts(contracts.map(contract => 
      contract.id === id ? { ...contract, fulfilled: true } : contract
    ))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Smart Contract Creator</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Smart Contract</CardTitle>
          <CardDescription>Define the terms and conditions for your smart contract</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Contract Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Terms and Conditions</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="reward">Reward Amount</Label>
              <Input
                id="reward"
                type="number"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Create Smart Contract</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Created Smart Contracts</h2>
      {contracts.map(contract => (
        <Card key={contract.id} className="mb-4">
          <CardHeader>
            <CardTitle>{contract.title}</CardTitle>
            <CardDescription>Reward: {contract.reward} ETH</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{contract.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            {contract.fulfilled ? (
              <div className="flex items-center text-green-500">
                <CheckCircle2 className="mr-2" />
                Fulfilled
              </div>
            ) : (
              <div className="flex items-center text-yellow-500">
                <AlertTriangle className="mr-2" />
                Pending
              </div>
            )}
            {!contract.fulfilled && (
              <Button onClick={() => fulfillContract(contract.id)}>
                Fulfill Contract
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}