'use client'

import React, { useState, useEffect } from 'react'
import { LiveProvider, LivePreview } from 'react-live'
import { Download, Copy, Check, Search, Code, Eye, AlertTriangle, Sliders, Moon, Sun, Palette } from 'lucide-react'
import componentRegistry, { ComponentConfig } from '../utils/componentRegistry'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ComponentDemoProps {
    isDarkMode: boolean;
    accentColor: string;
    setAccentColor: (color: string) => void;
  }
  

  export default function ComponentDemo({ isDarkMode, accentColor, setAccentColor }: ComponentDemoProps) {
    const [selectedType, setSelectedType] = useState<keyof typeof componentRegistry>('Encabezados')
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
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg rounded-lg transition-all duration-300`}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{color: accentColor}}>Explorador de Componentes</h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Descubre, personaliza e implementa componentes UI con facilidad.</p>
        </div>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cambiar color de acento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <Search className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
        <Input
          type="text"
          placeholder="Buscar componentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-grow ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className={`lg:col-span-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{color: accentColor}}>
                <Eye className="mr-2" /> Seleccionar Componente
              </CardTitle>
              <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Elige un componente para personalizar</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {filteredComponentTypes.map((type) => (
                    <div key={type} className="mb-4">
                      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{type}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {(componentRegistry[type as keyof typeof componentRegistry] || []).map((config, index) => (
                          <Button
                            key={config?.name || `${type}-${index}`}
                            variant={selectedType === type && selectedComponentIndex === index ? "default" : "outline"}
                            onClick={() => {
                              setSelectedType(type as keyof typeof componentRegistry)
                              setSelectedComponentIndex(index)
                            }}
                            className="w-full justify-start text-left"
                            style={{borderColor: accentColor, color: selectedType === type && selectedComponentIndex === index ? 'white' : accentColor}}
                          >
                            {config?.name || `Componente ${index + 1}`}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{color: accentColor}}>
                <Sliders className="mr-2" /> Personalizar Componente
              </CardTitle>
              <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Ajusta las propiedades de {selectedComponent?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {selectedComponent?.customizableProps ? (
                  <div className="space-y-6">
                    {Object.entries(selectedComponent.customizableProps).map(([propName, propConfig]) => (
                      <div key={propName} className="space-y-2">
                        <Label htmlFor={propName} className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{propConfig.label}</Label>
                        {propConfig.type === 'text' && (
                          <Input
                            type="text"
                            id={propName}
                            value={customProps[propName] || ''}
                            onChange={(e) => handlePropChange(propName, e.target.value)}
                            className={`w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
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
                              className={`flex-grow ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                            />
                          </div>
                        )}
                        {propConfig.type === 'number' && (
                          <Input
                            type="number"
                            id={propName}
                            value={customProps[propName] || 0}
                            onChange={(e) => handlePropChange(propName, parseFloat(e.target.value))}
                            className={`w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                          />
                        )}
                        {propConfig.type === 'boolean' && (
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={propName}
                              checked={customProps[propName] || false}
                              onChange={(e) => handlePropChange(propName, e.target.checked)}
                              className={`rounded border-gray-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                              style={{accentColor: accentColor}}
                            />
                            <Label htmlFor={propName} className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{customProps[propName] ? 'Activado' : 'Desactivado'}</Label>
                          </div>
                        )}
                        {propConfig.type === 'select' && (
                          <Select
                            value={customProps[propName] || ''}
                            onValueChange={(value) => handlePropChange(propName, value)}
                          >
                            <SelectTrigger className={`w-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                            <SelectContent className={isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}>
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
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No hay propiedades personalizables disponibles para este componente.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className={`lg:col-span-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{color: accentColor}}>
                <Eye className="mr-2" /> Vista Previa del Componente
              </CardTitle>
              <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Visualiza e interactúa con el componente personalizado</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="preview" className="flex items-center" style={{color: accentColor}}><Eye className="w-4 h-4 mr-2" /> Vista Previa</TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center" style={{color: accentColor}}><Code className="w-4 h-4 mr-2" /> Código</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className={`p-6 border rounded-md ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  {selectedComponent ? (
                    <LiveProvider code={code} scope={{ [selectedComponent.name]: selectedComponent.component }}>
                      <LivePreview />
                    </LiveProvider>
                  ) : (
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No se ha seleccionado ningún componente</p>
                  )}
                </TabsContent>
                <TabsContent value="code" className="mt-4">
                  <pre className={`p-4 text-sm overflow-x-auto rounded-md ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                    <code className="text-sm">{code || 'No hay código disponible'}</code>
                  </pre>
                </TabsContent>
              </Tabs>
              <div className="flex justify-end space-x-2 mt-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" onClick={handleCopy} disabled={!code} style={{borderColor: accentColor, color: accentColor}}>
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Copiado" : "Copiar Código"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copiar el código al portapapeles</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleDownload} disabled={!selectedComponent} style={{backgroundColor: accentColor}}>
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Descargar el código como archivo .tsx</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          <Card className={`lg:col-span-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{color: accentColor}}>
                <AlertTriangle className="mr-2" /> Descripción del Componente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{selectedComponent?.description || 'No hay descripción disponible'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Nueva sección: Historial de componentes */}
        <Card className={`mt-8 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardHeader>
            <CardTitle className="flex items-center" style={{color: accentColor}}>
              <Sliders className="mr-2" /> Historial de Componentes
            </CardTitle>
            <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Tus componentes personalizados recientes</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {/* Aquí iría el mapeo del historial de componentes */}
                <Button variant="ghost" className="w-full justify-start text-left">
                  Botón Personalizado #1
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left">
                  Tarjeta de Producto #2
                </Button>
                {/* ... más elementos del historial */}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Footer con información adicional */}
        <footer className={`mt-8 pt-4 border-t ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
          <div className="flex justify-between items-center">
            <p>© 2024 Tu Empresa. Todos los derechos reservados.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">Documentación</a>
              <a href="#" className="hover:underline">Soporte</a>
              <a href="#" className="hover:underline">Acerca de</a>
            </div>
          </div>
        </footer>
      </div>
  )
}