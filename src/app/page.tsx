'use client';

import { Layout, Typography } from 'antd';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>
        <div style={{ textAlign: 'center' }}>
          <Title style={{ fontSize: '64px', fontWeight: 700, marginBottom: '24px' }}>
            Holmes Engineering
          </Title>
          <Text style={{ fontSize: '24px', color: '#4b5563', display: 'block', marginBottom: '48px' }}>
            Precision engineering for a sustainable future.
          </Text>
          <Text style={{ fontSize: '18px', color: '#9ca3af' }}>
            Innovating at the intersection of technology and design.
          </Text>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #f0f0f0' }}>
        © {new Date().getFullYear()} Holmes Engineering. All rights reserved.
      </Footer>
    </Layout>
  );
}
