'use client'

import React, { useState, useEffect } from 'react'
import { LiveProvider, LivePreview } from 'react-live'
import { Download, Copy, Check, ChevronDown, Search, Code, Eye, AlertTriangle } from 'lucide-react'
import componentRegistry, { ComponentConfig } from '../utils/componentRegistry'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ComponentDemo() {
  const [selectedType, setSelectedType] = useState<keyof typeof componentRegistry>('Headers')
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<number>(0)
  const [customProps, setCustomProps] = useState<Record<string, any>>({})
  const [copied, setCopied] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  const componentConfigs = componentRegistry[selectedType] || []
  const selectedComponent = componentConfigs[selectedComponentIndex]

  useEffect(() => {
    setCustomProps({})
    setError(null)
  }, [selectedType, selectedComponentIndex])

  const generateCode = (component: ComponentConfig, props: Record<string, any>) => {
    if (!component) return ''
    const propsString = Object.entries({ ...component.defaultProps, ...props })
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`
        } else if (typeof value === 'boolean') {
          return value ? key : `${key}={false}`
        } else {
          return `${key}={${JSON.stringify(value)}}`
        }
      })
      .join(' ')
    return `<${component.name} ${propsString} />`
  }

  const code = selectedComponent ? generateCode(selectedComponent, customProps) : ''

  const handleCopy = () => {
    if (!code) return
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleDownload = () => {
    if (!selectedComponent) return
    const element = document.createElement("a")
    const file = new Blob([code], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = `${selectedComponent.name}.tsx`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handlePropChange = (propName: string, value: any) => {
    setCustomProps(prev => ({ ...prev, [propName]: value }))
  }

  const filteredComponentTypes = Object.keys(componentRegistry).filter(type =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Component</CardTitle>
            <CardDescription>Choose a component type and specific component to customize</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {filteredComponentTypes.map((type) => (
                  <div key={type}>
                    <h3 className="text-lg font-semibold mb-2">{type}</h3>
                    <div className="flex flex-wrap gap-2">
                      {(componentRegistry[type as keyof typeof componentRegistry] || []).map((config, index) => (
                        <Button
                          key={config?.name || `${type}-${index}`}
                          variant={selectedType === type && selectedComponentIndex === index ? "default" : "outline"}
                          onClick={() => {
                            setSelectedType(type as keyof typeof componentRegistry)
                            setSelectedComponentIndex(index)
                          }}
                        >
                          {config?.name || `Component ${index + 1}`}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customize Component</CardTitle>
            <CardDescription>Adjust the properties of the selected component</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {selectedComponent?.customizableProps ? (
                <div className="space-y-4">
                  {Object.entries(selectedComponent.customizableProps).map(([propName, propConfig]) => (
                    <div key={propName} className="space-y-2">
                      <Label htmlFor={propName}>{propConfig.label}</Label>
                      {propConfig.type === 'text' && (
                        <Input
                          type="text"
                          id={propName}
                          value={customProps[propName] || ''}
                          onChange={(e) => handlePropChange(propName, e.target.value)}
                        />
                      )}
                      {propConfig.type === 'color' && (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            id={propName}
                            value={customProps[propName] || '#ffffff'}
                            onChange={(e) => handlePropChange(propName, e.target.value)}
                            className="w-10 h-10 p-0 border-none"
                          />
                          <Input
                            type="text"
                            value={customProps[propName] || '#ffffff'}
                            onChange={(e) => handlePropChange(propName, e.target.value)}
                          />
                        </div>
                      )}
                      {propConfig.type === 'number' && (
                        <Input
                          type="number"
                          id={propName}
                          value={customProps[propName] || 0}
                          onChange={(e) => handlePropChange(propName, parseFloat(e.target.value))}
                        />
                      )}
                      {propConfig.type === 'boolean' && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={propName}
                            checked={customProps[propName] || false}
                            onChange={(e) => handlePropChange(propName, e.target.checked)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor={propName}>{customProps[propName] ? 'Enabled' : 'Disabled'}</Label>
                        </div>
                      )}
                      {propConfig.type === 'select' && (
                        <Select
                          value={customProps[propName] || ''}
                          onValueChange={(value) => handlePropChange(propName, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {propConfig.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No customizable properties available for this component.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Component Preview</CardTitle>
            <CardDescription>View and interact with the customized component</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview" className="flex items-center"><Eye className="w-4 h-4 mr-2" /> Preview</TabsTrigger>
                <TabsTrigger value="code" className="flex items-center"><Code className="w-4 h-4 mr-2" /> Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="p-4 border rounded-md mt-4">
                {selectedComponent ? (
                  <LiveProvider code={code} scope={{ [selectedComponent.name]: selectedComponent.component }}>
                    <LivePreview />
                  </LiveProvider>
                ) : (
                  <p className="text-gray-500">No component selected</p>
                )}
              </TabsContent>
              <TabsContent value="code" className="mt-4">
                <pre className="p-4 text-sm overflow-x-auto bg-gray-100 rounded-md">
                  <code>{code || 'No code available'}</code>
                </pre>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={handleCopy} disabled={!code}>
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
              <Button onClick={handleDownload} disabled={!selectedComponent}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Component Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{selectedComponent?.description || 'No description available'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}