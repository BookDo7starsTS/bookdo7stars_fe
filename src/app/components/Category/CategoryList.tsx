'use client';
import { useEffect, useState } from 'react';

import { getAllCategoriesRequest } from '@/app/actions/types';
import { Category } from '@/app/models/category';
import { RootState } from '@/app/reducers';
import { AppDispatch } from '@/app/store/store';
import { Box } from '@mui/material';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

type CategoryListProps = {
  categoryId: string;
  treeData: any[];
};

const CategoryList = (props: CategoryListProps) => {
  const { categoryId, treeData } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([categoryId]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([categoryId]);
  const router = useRouter();

  const findParentKeys = (key: string, data: any[]): string[] => {
    const parents: string[] = [];
    const find = (nodes: any[], path: string[] = []) => {
      for (const node of nodes) {
        if (node.key === key) {
          parents.push(...path);
          return;
        }
        if (node.children) {
          find(node.children, [...path, node.key]);
        }
      }
    };
    find(data);
    return parents;
  };
  useEffect(() => {
    if (treeData.length > 0) {
      const parentKeys = findParentKeys(categoryId, treeData);
      setExpandedKeys((prev) => Array.from(new Set([...prev, ...parentKeys, categoryId])));
    }
  }, [categoryId, treeData]);

  const handleExpand = (keys: string[]) => {
    setExpandedKeys([...expandedKeys, keys[keys.length - 1]]);
  };
  return (
    <Box>
      <Tree
        treeData={treeData}
        showIcon={false}
        defaultExpandAll={false}
        selectable
        onSelect={(keys) => {
          setSelectedKeys(keys as string[]);
          router.push(`/books/category/${keys[0]}`);
        }}
        onExpand={(keys) => {
          handleExpand(keys as string[]);
        }}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
      />
    </Box>
  );
};

export default CategoryList;
