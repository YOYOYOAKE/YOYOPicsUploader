import { spawn } from 'child_process'
import os from 'os'
import fs from 'fs'
import path from 'path'
import { UploadPics } from '../types'

const powershellScript = `
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$tempFile = [System.IO.Path]::Combine(
    [System.IO.Path]::GetTempPath(),
    [System.Guid]::NewGuid().ToString() + '.png'
)

# 检查剪贴板是否包含文件
if ([System.Windows.Forms.Clipboard]::ContainsFileDropList()) {
    $files = [System.Windows.Forms.Clipboard]::GetFileDropList()
    if ($files.Count -gt 0) {
        $file = $files[0]
        $imageExtensions = @('.png', '.jpg', '.jpeg', '.bmp')
        if ($imageExtensions -contains [System.IO.Path]::GetExtension($file).ToLower()) {
            try {
                Copy-Item -Path $file -Destination $tempFile -Force
                Write-Output $tempFile
                exit 0
            } catch {
                Write-Error "复制图片文件失败"
                exit 1
            }
        }
    }
}

# 如果不是文件或不是图片文件，则尝试处理剪贴板图片
if ([System.Windows.Forms.Clipboard]::ContainsImage()) {
    try {
        $image = [System.Windows.Forms.Clipboard]::GetImage()
        $image.Save($tempFile, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Output $tempFile
    } catch {
        Write-Error "保存图片失败"
        exit 1
    }
} else {
    Write-Output "剪贴板中没有图片"
}`

export const getClipboardPic = async (): Promise<UploadPics> => {
  return new Promise((resolve, reject) => {

    const scriptPath = path.join(os.tmpdir(), `clipboard-${Date.now()}.ps1`)
    fs.writeFileSync(scriptPath, powershellScript, 'utf8')

    const ps = spawn('powershell', [
      '-noprofile',
      '-noninteractive',
      '-nologo',
      '-sta',
      '-executionpolicy',
      'unrestricted',
      '-file',
      scriptPath
    ])

    let stdout = ''
    let stderr = ''

    ps.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    ps.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    ps.on('close', (code) => {
      fs.unlinkSync(scriptPath)

      if (code !== 0) { return reject(new Error(stderr)) }

      const imagePath = stdout.trim()

      if (!imagePath || !fs.existsSync(imagePath)) {
        return resolve({
          buffer: null,
          status: 'empty'
        })
      }

      fs.readFile(imagePath, (err, data) => {
        if (err) { reject(err) }
        resolve({
          buffer: data,
          status: 'success'
        })
      })
    })
  })
}
