import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('xyz')

/**
 * Scans faces.
 */
export function scanFaces(frame) {
  'worklet'
  if (plugin == null) throw new Error('Failed to load Frame Processor Plugin "scanFaces"!')
  return plugin.call(frame)
}