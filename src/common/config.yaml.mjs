const value = _ => `title: Fewu
description: ''
author: Meteor
language: zh-CN
timezone: Asia/Shanghai
url: https://blog.myweb.site/
root: /
source_dir: source
public_dir: public
theme: "@fewu-swg/fewu-theme-next"
excluded_files: 
  - posts/template.md
plugin_configs:
  fewu-plugin-basic-improvement:
    rss:
      enabled: true
    sitemap:
      enabled: true
      type: xml
    extra-files:
      enabled: false
      from: "./extra/"
      files:
`;

export {
    value
};